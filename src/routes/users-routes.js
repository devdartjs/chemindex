import { Router } from "express";
import { authentication } from "../middlewares/mid-security/users-authentication/authentication.js";
import { getIndexPage } from "../controllers/users-controllers/v1/getIndexPage.js";
import { getLoginPage } from "../controllers/users-controllers/v1/getLoginPage.js";
import { getSingUpPage } from "../controllers/users-controllers/v1/getSingUpPage.js";
import { getUserSystemPage } from "../controllers/users-controllers/v1/getUserSystemPage.js";
import { getUserRegisterPage } from "../controllers/users-controllers/v1/getUserRegisterPage.js";
import { getUserUpdatePage } from "../controllers/users-controllers/v1/getUserUpdatePage.js";
import { getDashboardReagents } from "../controllers/users-controllers/v1/getDashboardReagents.js";

const usersRouter = Router();

usersRouter.get("/", getIndexPage);
usersRouter.get("/login", getLoginPage);
usersRouter.get("/sign-up", getSingUpPage);
usersRouter.get("/dashboard-reagents", authentication, getDashboardReagents);

usersRouter.get("/user-system", authentication, getUserSystemPage);
usersRouter.get("/user-register-session", authentication, getUserRegisterPage);
usersRouter.get("/user-update-session", authentication, getUserUpdatePage);

export default usersRouter;
