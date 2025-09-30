import { Router } from "express";
import sanitizeReagentInput from "../middlewares/mid-clean-inputs/sanitize/reagent-sanitize.js";
import escapeReagentInput from "../middlewares/mid-clean-inputs/escape/reagent-escape.js";
import createReagent from "../controllers/reagents-user-controller/createReagent.js";
import updateReagent from "../controllers/reagents-user-controller/updateReagent.js";
import deleteReagent from "../controllers/reagents-user-controller/deleteReagent.js";

const reagentsStateRouter = Router();

reagentsStateRouter.post(
  "/",
  sanitizeReagentInput,
  escapeReagentInput,
  createReagent
);
reagentsStateRouter.put(
  "/:casNumber",
  sanitizeReagentInput,
  escapeReagentInput,
  updateReagent
);
reagentsStateRouter.delete("/:casNumber", deleteReagent);

export default reagentsStateRouter;
