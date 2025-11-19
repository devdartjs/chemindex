import { Router } from "express";
import { authentication } from "../middlewares/mid-security/users-authentication/authentication.js";
import { getIndexPagev2 } from "../controllers/users-controllers/v2/getIndexPage-v2.js";
import { getLoginPagev2 } from "../controllers/users-controllers/v2/getLoginPage-v2.js";
import { getSingUpPagev2 } from "../controllers/users-controllers/v2/getSingUpPage-v2.js";
import { getUserSystemPagev2 } from "../controllers/users-controllers/v2/getUserSystemPage-v2.js";
import { getUserRegisterPagev2 } from "../controllers/users-controllers/v2/getUserRegisterPage-v2.js";
import { getUserUpdatePagev2 } from "../controllers/users-controllers/v2/getUserUpdatePage-v2.js";
import { getDashboardReagentsv2 } from "../controllers/users-controllers/v2/getDashboardReagents-v2.js";

const usersRouterv2 = Router();

usersRouterv2.get("/", getIndexPagev2);
usersRouterv2.get("/login", getLoginPagev2);
usersRouterv2.get("/sign-up", getSingUpPagev2);
usersRouterv2.get(
  "/dashboard-reagents",
  authentication,
  getDashboardReagentsv2
);

usersRouterv2.get("/user-system", authentication, getUserSystemPagev2);
usersRouterv2.get(
  "/user-register-session",
  authentication,
  getUserRegisterPagev2
);
usersRouterv2.get("/user-update-session", authentication, getUserUpdatePagev2);

export default usersRouterv2;
