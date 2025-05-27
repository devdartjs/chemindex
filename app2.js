import express from 'express';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { NODE_ENV} from './config/config.env.js';
import cspMiddleware from './mid-security/csp.middlewares.js';
import { checkUser } from './mid-security/users.authentication.js';

const app = express();
const PORT = 3050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewPath = path.resolve(__dirname, 'views');
const publicPath = path.resolve(__dirname, 'public');

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(cspMiddleware);


app.get('/2', checkUser, (req, res) => {
    return res.status(200).render('home', { nonce: res.locals.nonce, user: res.locals.use });
});

app.get('/2login', (req, res) => {
    return res.status(200).render('login', { nonce: res.locals.nonce, user: res.locals.user});
});

app.get('/2sign-up', (req, res) => {
    return res.status(200).render('sign-up', { nonce: res.locals.nonce, user: res.locals.user});
});

app.use((req, res) => {
    res.status(400).json({ message: 'Error 404: Page not Found'}); //criar página page not found e renderizar
});

app.listen(PORT, () => {
    console.log(`✅ Server running at port ${PORT} and ${NODE_ENV} mode`);
});

export default app;