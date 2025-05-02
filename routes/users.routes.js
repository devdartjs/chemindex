import { Router } from 'express';
import { authentication } from '../mid-security/users.authentication.js';
import { getIndexPage, getLoginPage, getSingUpPage, getUserSystemPage, getUserRegisterPage, getUserUpdatePage } from '../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', getIndexPage);
usersRouter.get('/login', getLoginPage);
usersRouter.get('/sign-up', getSingUpPage);

usersRouter.get('/user-system', authentication, getUserSystemPage);
usersRouter.get('/user-register-session', authentication, getUserRegisterPage);
usersRouter.get('/user-update-session', authentication, getUserUpdatePage);

export default usersRouter;
