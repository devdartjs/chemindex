import { Router } from 'express';
import { getAllReagents, getUserReagents, getUserReagent, createUserReagent, updateUserReagent, deleteUserReagent } from '../../controllers/admin/reagents.admin.controllers.js';

const adminReagentsRouter = Router(); //middlewares: checkUser, authentication, permissions, validation, escape, sanitization

adminReagentsRouter.get('/', getAllReagents);
adminReagentsRouter.get('/:userId', getUserReagents);
adminReagentsRouter.get('/:userId/:casNumber', getUserReagent);
adminReagentsRouter.post('/:userId', createUserReagent);
adminReagentsRouter.put('/:userId/:casNumber', updateUserReagent);
adminReagentsRouter.delete('/:userId/:casNumber', deleteUserReagent);

export default adminReagentsRouter;
