import { Router } from 'express';
import { getAdminPage, loginAdmin } from '../../controllers/admin/admin.controllers.js';
import { sanitizeUsersInput } from '../../mid-clean-inputs/sanitize/user.sanitize.js';
import { escapeReagentInput } from '../../mid-clean-inputs/escape/reagent.escape.js';
import validate from '../../mid-clean-inputs/validate/schemas.validate.js';
import { userSchemaAccessValidator } from '../../mid-clean-inputs/validate/users.validate.js';
import { checkUser } from '../../mid-security/users.authentication.js';
import { authentication } from '../../mid-security/users.authentication.js';
import { checkAdmin } from '../../mid-admin/permission.admin.js';
const userValidation = validate({ body: userSchemaAccessValidator});

const adminRouter = Router();

adminRouter.get('/', checkUser, authentication, checkAdmin, getAdminPage);
adminRouter.post('/login', sanitizeUsersInput, escapeReagentInput, userValidation, loginAdmin);

export default adminRouter;
