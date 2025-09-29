import { Router } from "express";
import { sanitizeReagentInput } from "../middlewares/mid-clean-inputs/sanitize/reagent.sanitize.js";
import { escapeReagentInput } from "../middlewares/mid-clean-inputs/escape/reagent.escape.js";
import {
  createReagent,
  updateReagent,
  deleteReagent,
} from "../controllers/reagents.controller.js";

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
