import { Router } from 'express';
import { getAdminPage, loginAdmin } from '../../controllers/admin/admin.controllers.js';
import { sanitizeUsersInput } from '../../mid-clean-inputs/sanitize/user.sanitize.js';
import { escapeReagentInput } from '../../mid-clean-inputs/escape/reagent.escape.js';
import validate from '../../mid-clean-inputs/validate/schemas.validate.js';
import { userSchemaAccessValidator } from '../../mid-clean-inputs/validate/users.validate.js';
const userValidation = validate({ body: userSchemaAccessValidator});

const adminRouter = Router(); //middlewares: falta fazer middleware de permissões

adminRouter.get('/', getAdminPage);
adminRouter.post('/login', sanitizeUsersInput, escapeReagentInput, userValidation, loginAdmin);
//signUp via CMD

export default adminRouter;
