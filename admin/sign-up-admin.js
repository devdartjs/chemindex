import { DB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_STATUS, ADMIN_CREATION_TOKEN } from "../config/config.env.js";
import mongoose from "mongoose";
import User from '../models/user.model.js';
import connectToMongoDB from "../database/mongodb.js";
import createToken from "../mid-functions/creat.token.js";
export async function signUpAdmin() {

    try{
        if (process.env.NODE_ENV === 'production-x') {
            console.error(' Admin creation disabled in production');
            process.exit(1);
        };

        if(!DB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_STATUS || !ADMIN_CREATION_TOKEN){
            console.error('Action Denied: missing one of DB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_STATUS');
            process.exit(1);
        };

        await connectToMongoDB();

        const existingAdmin = await User.find({ status: ADMIN_STATUS});
        if(existingAdmin.length !== 0) throw new Error('Admin Sign-Up not allowed');

        const user = await User.create({
            email: ADMIN_EMAIL,
            password:ADMIN_PASSWORD,
            status: ADMIN_STATUS
        });

        if(!user) throw new Error('Error while creating admin account');

        console.log('Admin has been created', user.email);
        
    } catch(error){
        console.error('Error creating admin:', error.message);
        process.exit(1);

    } finally{
        mongoose.disconnect();
        console.log('DB disconnected');
        process.exit(0);
    };
};

signUpAdmin();
