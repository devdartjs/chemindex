    import User from '../models/user.model.js';
    import { handleErrors } from '../mid-functions/error.handler.js';
    import createToken from '../mid-functions/creat.token.js';

        export const signUp = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.create({ email, password });
            console.log('signupPost-controller (1):', user);

            const token = createToken(user._id);
            res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 1 * 1000 * 60 * 60 * 24,
            });

            res.status(201).json({ user });

        } catch (err) {
            if (err.code === 11000) {
            console.log('error code captured', err.code);
            return res.status(400).json({ errors: { email: 'That email is already used!' } });
            }

            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
            console.log(email, password);
        }
        }

        export const login = async (req, res) => {
        
        const { email, password } = req.body;
        console.log('console.log-loginPostController (1)', email, password);

        try {
            const user = await User.login(email, password);

            if (user) {
                const token = createToken(user._id);
                
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1 * 1000 * 60 * 60 * 24,
                });
            
            console.log('login token:', token);

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
        }



