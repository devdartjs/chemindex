import { Router } from 'express';
import csrfProtection from '../middlewares/mid-security/csrf.create.token.js';
import csrfErrorHandler from '../middlewares/mid-security/csrf.error.handler.js';

const csrfRouter = Router();

csrfRouter.get('/csrf-token', csrfProtection, csrfErrorHandler, (req, res) => {
  try {
    const csrf = req.csrfToken();
    if (!csrf) {
      console.error('CSRF token not found in request.');
      return res.status(400).json({ error: 'CSRF token not found' });
    }
    console.log('CSRF Token generated:', csrf);

    res.status(200).json({ csrf });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    console.log('CSRF token request completed.');
  }
});

export default csrfRouter;
