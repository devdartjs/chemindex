import { Router } from "express";
import csrfProtection from "../mid-security/csrf.create.token.js";
import csrfErrorHandler from "../mid-security/csrf.error.handler.js";

const csrfRouter = Router();

csrfRouter.get('/csrf-token', csrfProtection, csrfErrorHandler, (req, res) => {
    
    const csrf = req.csrfToken();
    console.log('Generated csrf-token:', csrf);
    
    res.status(200).json({ csrf });
});

export default csrfRouter;
