import { Router } from "express";
import { login } from "../controllers/users-auth-controller/login.js";
import { signUp } from "../controllers/users-auth-controller/signUp.js";
const authRouterState = Router();
authRouterState.post("/login", login);
authRouterState.post("/sign-up", signUp);
export default authRouterState;