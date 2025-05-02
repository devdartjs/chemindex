import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import ejs from 'ejs';
import path from 'path';
import { PORT, NODE_ENV} from './config/config.env.js';
import connectToMongoDB from './database/mongodb.js';
import authRouterState from './routes/users.auth.routes.js';
import usersRouter from './routes/users.routes.js';
import reagentsRouter from './routes/reagents.routes.js';
import reagentsStateRouter from './routes/reagents.state.routes.js';
import csrfRouter from './route.csurf/csurf.token.js';
import { userSchemaAccessValidator } from './mid-clean-inputs/validate/users.validate.js';
import { reagentSchemaCreateValidator } from './mid-clean-inputs/validate/reagents.validate.js';
import validate from './mid-clean-inputs/validate/schemas.validate.js';
import { sanitizeUsersInput } from './mid-clean-inputs/sanitize/user.sanitize.js';
import { escapeUserInput } from './mid-clean-inputs/escape/user.escape.js';
// import { sanitizeReagentInput } from './mid-clean-inputs/sanitize/reagent.sanitize.js';
// import { escapeReagentInput } from './mid-clean-inputs/escape/reagent.escape.js';
import cspMiddleware from './mid-security/csp.middlewares.js';
import { checkUser, authentication } from './mid-security/users.authentication.js';

const app = express();
connectToMongoDB();

const dirname = path.dirname(new URL(import.meta.url).pathname);
const fixedDirname = dirname.startsWith('/') ? dirname.substring(1) : dirname;
const viewPath = path.resolve(fixedDirname, 'views');
const publicPath = path.resolve(fixedDirname, 'public');

app.set('view engine', 'ejs');
app.set('views', viewPath);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true})); //verificar o código disso
app.use(express.static(publicPath));
app.use(cookieParser());
mongoose.set('sanitizeFilter', true);
app.use(morgan('dev'));
app.use(cspMiddleware);

const userValidation = validate({ body: userSchemaAccessValidator});
const reagentValidation = validate({ body: reagentSchemaCreateValidator});

app.use('/', checkUser, usersRouter);
app.use('/api/v1/users/auth', sanitizeUsersInput, escapeUserInput, userValidation, authRouterState); //verificar políticas CSP
app.use('/api/v1/reagents/:userId', checkUser, authentication, reagentValidation, reagentsRouter);
app.use('/api/v1/reagents/auth/:userId', checkUser, authentication, reagentValidation, reagentsStateRouter);
app.use('/api/v1/token', csrfRouter);

app.use((req, res) => {
    res.status(400).json({ message: 'Error 404: Page not Found'}); //criar página page not found e renderizar
});

app.listen(PORT, () => {
    console.log(`✅ Server running at port ${PORT} and ${NODE_ENV} mode`);
});

export default app;