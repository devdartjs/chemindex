import { Router } from 'express';
import { login, signUp } from '../controllers/users.auth.controller.js';

const authRouterState = Router();

authRouterState.post('/login', login);
authRouterState.post('/sign-up', signUp);

export default authRouterState;
