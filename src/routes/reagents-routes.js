import { Router } from "express";
import getReagents from "../controllers/reagents-user-controller/getReagents.js";
import getReagent from "../controllers/reagents-user-controller/getReagent.js";

const reagentsRouter = Router();

reagentsRouter.get("/", getReagents);
reagentsRouter.get("/:casNumber", getReagent);

export default reagentsRouter;
