import { Router } from 'express';
import { createReagent, updateReagent, deleteReagent } from '../controllers/reagents.controller.js';

const reagentsStateRouter = Router(); 

reagentsStateRouter.post('/', createReagent);
reagentsStateRouter.put('/:casNumber', updateReagent);
reagentsStateRouter.delete('/:casNumber', deleteReagent);

export default reagentsStateRouter;
