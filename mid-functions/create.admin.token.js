import jwt from 'jsonwebtoken';
import { JWT_SECRET_ADMIN, JWT_EXPIRES_IN_ADMIN, ADMIN_STATUS } from '../config/config.env.js';

const createAdminToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET_ADMIN, {expiresIn: JWT_EXPIRES_IN_ADMIN});
};

export default createAdminToken;
