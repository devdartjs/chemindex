import { Router } from 'express';
import { authentication } from '../middlewares/mid-security/users-authentication/authentication.js';
import { getIndexPage } from '../controllers/users-controllers/getIndexPage.js';
import { getLoginPage } from '../controllers/users-controllers/getLoginPage.js';
import { getSingUpPage } from '../controllers/users-controllers/getSingUpPage.js';
import { getUserSystemPage } from '../controllers/users-controllers/getUserSystemPage.js';
import { getUserRegisterPage } from '../controllers/users-controllers/getUserRegisterPage.js';
import { getUserUpdatePage } from '../controllers/users-controllers/getUserUpdatePage.js';
import { getDashboardReagents } from '../controllers/users-controllers/getDashboardReagents.js';

const usersRouter = Router();

usersRouter.get('/', getIndexPage);
usersRouter.get('/login', getLoginPage);
usersRouter.get('/sign-up', getSingUpPage);
usersRouter.get('/dashboard-reagents', authentication, getDashboardReagents);

usersRouter.get('/user-system', authentication, getUserSystemPage);
usersRouter.get('/user-register-session', authentication, getUserRegisterPage);
usersRouter.get('/user-update-session', authentication, getUserUpdatePage);

export default usersRouter;
