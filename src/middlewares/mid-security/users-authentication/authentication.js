import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config-env.js";

export const authentication = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        res.locals.user._id = { _id: decodedToken.id };

        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
