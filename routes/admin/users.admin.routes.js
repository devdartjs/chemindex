import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/admin/users.admin.controllers.js';
import { sanitizeUsersInput } from '../../mid-clean-inputs/sanitize/user.sanitize.js';
import { escapeUserInput } from '../../mid-clean-inputs/escape/user.escape.js';
import { userSchemaAccessValidator } from '../../mid-clean-inputs/validate/users.validate.js';
import validate from '../../mid-clean-inputs/validate/schemas.validate.js';
const userValidation = validate({ body: userSchemaAccessValidator});

const adminUsersRouter = Router();

adminUsersRouter.get('/', getUsers);
adminUsersRouter.get('/:userId', getUser);
adminUsersRouter.delete('/:userId', deleteUser);
adminUsersRouter.post('/', sanitizeUsersInput, escapeUserInput, userValidation, createUser);
adminUsersRouter.put('/:userId', sanitizeUsersInput, escapeUserInput, userValidation, updateUser);

export default adminUsersRouter;
