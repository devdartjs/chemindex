import jwt from "jsonwebtoken";
import User from "../../../models/user-model.js";
import { JWT_SECRET } from "../../../config/config-env.js";
export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.locals.user = null;
    req.user = null;
    return next();
  }
  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      console.error("[checkUser] Invalid JWT:", err.message);
      res.locals.user = null;
      req.user = null;
      return next();
    }
    try {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        console.warn("[checkUser] No user found for decoded token.");
        res.locals.user = null;
        req.user = null;
        return next();
      }
      res.locals.user = user;
      req.user = user;
      return next();
    } catch (dbError) {
      console.error("[checkUser] Database error while fetching user:", dbError);
      res.locals.user = null;
      req.user = null;
      return next();
    }
  });
};