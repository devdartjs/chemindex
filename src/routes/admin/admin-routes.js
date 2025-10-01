import { Router } from "express";
import { getAdminPage } from "../../controllers/admin/admin-controller/getAdminPage.js";
import { loginAdmin } from "../../controllers/admin/admin-controller/loginAdmin.js";
import { sanitizeUsersInput } from "../../middlewares/mid-clean-inputs/sanitize/user-sanitize.js";
import { escapeReagentInput } from "../../middlewares/mid-clean-inputs/escape/reagent-escape.js";
import validate from "../../middlewares/mid-clean-inputs/validate/schemas-validate.js";
import { userSchemaAccessValidator } from "../../middlewares/mid-clean-inputs/validate/users-validate.js";
import { checkUser } from "../../middlewares/mid-security/users-authentication/checkUser.js";
import { authentication } from "../../middlewares/mid-security/users-authentication/authentication.js";
import { checkAdmin } from "../../middlewares/mid-admin/permission-admin.js";
const userValidation = validate({ body: userSchemaAccessValidator });

const adminRouter = Router();

adminRouter.get("/", checkUser, authentication, checkAdmin, getAdminPage);
adminRouter.post(
  "/login",
  sanitizeUsersInput,
  escapeReagentInput,
  userValidation,
  loginAdmin
);

export default adminRouter;
