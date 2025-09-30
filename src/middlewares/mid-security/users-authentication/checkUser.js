import jwt from 'jsonwebtoken';
import User from '../../../models/user-model.js';
import { JWT_SECRET } from '../../../config/config-env.js';

export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        req.user = null;
        return next();
      }
      try {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        req.user = user;

        return next();
      } catch (dbError) {
        res.locals.user = null;
        req.user = null;
        return next();
      }
    });
  } else {
    res.locals.user = null;
    req.user = null;

    return next();
  }
};
