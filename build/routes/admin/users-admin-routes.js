import { Router } from "express";
import getUsers from "../../controllers/admin/users-admin-controller/getUsers.js";
import getUser from "../../controllers/admin/users-admin-controller/getUser.js";
import createUser from "../../controllers/admin/users-admin-controller/createUser.js";
import updateUser from "../../controllers/admin/users-admin-controller/updateUser.js";
import deleteUser from "../../controllers/admin/users-admin-controller/deleteUser.js";
import { sanitizeUsersInput } from "../../middlewares/mid-clean-inputs/sanitize/user-sanitize.js";
import { escapeUserInput } from "../../middlewares/mid-clean-inputs/escape/user-escape.js";
import { userSchemaAccessValidator } from "../../middlewares/mid-clean-inputs/validate/users-validate.js";
import validate from "../../middlewares/mid-clean-inputs/validate/schemas-validate.js";
const userValidation = validate({
  body: userSchemaAccessValidator
});
const adminUsersRouter = Router();
adminUsersRouter.get("/", getUsers);
adminUsersRouter.get("/:userId", getUser);
adminUsersRouter.delete("/:userId", deleteUser);
adminUsersRouter.post("/", sanitizeUsersInput, escapeUserInput, userValidation, createUser);
adminUsersRouter.put("/:userId", sanitizeUsersInput, escapeUserInput, userValidation, updateUser);
export default adminUsersRouter;