import { Router } from "express";
import { authentication } from "../middlewares/mid-security/users.authentication.js";
import {
  getIndexPage,
  getLoginPage,
  getSingUpPage,
  getUserSystemPage,
  getUserRegisterPage,
  getUserUpdatePage,
  getDashboardReagents,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getIndexPage);
usersRouter.get("/login", getLoginPage);
usersRouter.get("/sign-up", getSingUpPage);
usersRouter.get("/dashboard-reagents", authentication, getDashboardReagents);

usersRouter.get("/user-system", authentication, getUserSystemPage);
usersRouter.get("/user-register-session", authentication, getUserRegisterPage);
usersRouter.get("/user-update-session", authentication, getUserUpdatePage);

//rota por fazer
// usersRouter.get('/waiting-list', authentication, getWaitingListPage);

export default usersRouter;
