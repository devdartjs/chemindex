import { Router } from "express";
import getAllReagents from "../../controllers/admin/reagent-admin-controller/getAllReagents.js";
import getUserReagents from "../../controllers/admin/reagent-admin-controller/getUserReagents.js";
import getUserReagent from "../../controllers/admin/reagent-admin-controller/getUserReagent.js";
import createUserReagent from "../../controllers/admin/reagent-admin-controller/createUserReagent.js";
import { updateReagent } from "../../controllers/reagents-user-controller/updateReagent.js";
import { deleteReagent } from "../../controllers/reagents-user-controller/deleteReagent.js";
import { reagentSchemaCreateValidator } from "../../middlewares/mid-clean-inputs/validate/reagents-validate.js";
import validate from "../../middlewares/mid-clean-inputs/validate/schemas-validate.js";
import { sanitizeReagentInput } from "../../middlewares/mid-clean-inputs/sanitize/reagent-sanitize.js";
import { escapeReagentInput } from "../../middlewares/mid-clean-inputs/escape/reagent-escape.js";

const reagentValidation = validate({ body: reagentSchemaCreateValidator });
const adminReagentsRouter = Router();

adminReagentsRouter.get("/", getAllReagents);
adminReagentsRouter.get("/:userId", getUserReagents);
adminReagentsRouter.get("/:userId/:casNumber", getUserReagent);
adminReagentsRouter.delete("/:userId/:casNumber", deleteReagent);
adminReagentsRouter.post(
  "/:userId",
  sanitizeReagentInput,
  escapeReagentInput,
  reagentValidation,
  createUserReagent
);
adminReagentsRouter.put(
  "/:userId/:casNumber",
  sanitizeReagentInput,
  escapeReagentInput,
  reagentValidation,
  updateReagent
);

export default adminReagentsRouter;
