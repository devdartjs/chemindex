import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/admin/users.admin.controllers.js';

const adminUsersRouter = Router(); //middlewares: checkUser, authentication, permissions, validation, escape, sanitization

adminUsersRouter.get('/', getUsers);
adminUsersRouter.get('/:id', getUser);
adminUsersRouter.post('/', createUser);
adminUsersRouter.put('/:id', updateUser);
adminUsersRouter.delete('/:id', deleteUser);

export default adminUsersRouter;
