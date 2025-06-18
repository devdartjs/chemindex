import { Router } from "express";
import { getReagents, getReagent } from "../controllers/reagents.controller.js";

const reagentsRouter = Router();

reagentsRouter.get("/", getReagents);
reagentsRouter.get("/:casNumber", getReagent);

export default reagentsRouter;
