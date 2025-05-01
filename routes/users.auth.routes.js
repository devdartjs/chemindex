import { Router } from 'express';
import { login, signUp, logout } from '../controllers/users.auth.controller.js';

const authRouterState = Router();

authRouterState.post('/login', login);
authRouterState.post('/sign-up', signUp);
authRouterState.get('/logout', logout);

export default authRouterState;

