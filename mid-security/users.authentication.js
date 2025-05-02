import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/config.env.js';

export const authentication = (req, res, next) => {
    const token = req.cookies.jwt;
    // const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    console.log('authentication req-coockies-jwt Token:', token);

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {

        if (err) {
            console.log('Error while verifying token:', err.message);
            return res.redirect('/login');

        } else {
            console.log('Token has been verified:', decodedToken);
            res.locals.user._id = { _id: decodedToken.id };
            console.log('res.locals.userId-jwtMid:', res.locals.user._id);
            next();
        }
        }); 
    } else {
        res.redirect('/login');
    }
};

export const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    // const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {

        if (err) {
            console.log('Error while verifying token:', err.message);
            res.locals.user = null;
            req.user = null;
            return next();

        } else {
            
            try {
            const user = await User.findById(decodedToken.id);
            res.locals.user = user;
            req.user = user;
            console.log('user was send to locals:', res.locals.user);
            next();

            } catch (dbError) {
            console.log('Error while searching user:', dbError.message);
            res.locals.user = null;
            req.user = null;
            next();
            }
        }
        });
    } else {
        res.locals.user = null;
        req.user = null;
        next();
}
};


