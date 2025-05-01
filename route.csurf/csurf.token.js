import { Router } from "express";
import csrfProtection from "../mid-security/csrf.create.token.js";
import csrfErrorHandler from "../mid-security/csrf.error.handler.js";

const csrfRouter = Router();

csrfRouter.get('/crsf-token', csrfProtection, csrfErrorHandler, (req, res) => {
    res.status(200).json({ csrf: req.csrfToken()});
});

export default csrfRouter;
