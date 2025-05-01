import { Router } from 'express';
import validate from '../mid-clean-inputs/validate/schemas.validate.js';
import { getReagents, getReagent } from '../controllers/reagents.controller.js';
import { reagentSchemaCreateValidator } from '../mid-clean-inputs/validate/reagents.validate.js';

const reagentsRouter = Router();
const reagentValidation = validate({ body: reagentSchemaCreateValidator});

reagentsRouter.get('/', getReagents);
reagentsRouter.get('/:casNumber', reagentValidation, getReagent);

export default reagentsRouter;


