import User from "../../models/user.model.js";
import { handleErrors } from "../../mid-functions/error.handler.js";
import createToken from "../../mid-functions/creat.token.js";

export const getAdminPage = async (req, res) => {
    res.status(200).json({ message: 'Render Admin Page', user: res.locals.user._id, status: res.locals.user.status, nonce: res.locals.nonce});
};

export const loginAdmin = async (req, res) => {
        
        const { email, password } = req.body;
        console.log('console.log-loginAdminControl (1)', email, password);

        try {
            const user = await User.login(email, password);
            if(user.status !== 'admin') throw new Error('Admin permissions required');

            if (user) {
                const token = createToken(user._id);

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1 * 1000 * 60 * 60 * 24,
                });
            
            console.log('login admin token:', token);

            return res.status(200).json({ user, token, nonce: res.locals.nonce });
            }

            throw new Error('incorrect password');
        } catch (err) {

            const errors = handleErrors(err);

            if (err.message === 'incorrect email') {
            return res.status(400).json({ errors: { email: errors.email } });

            } else if (err.message === 'incorrect password') {
            return res.status(400).json({ errors: { password: errors.password } });
            }
        }

        console.log(res.locals.user);
};