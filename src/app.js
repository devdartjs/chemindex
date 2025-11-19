import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import helmet from "helmet";
import setupSwagger from "../swagger.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import { PORT, NODE_ENV } from "./config/config-env.js";
import connectToMongoDB from "./database/mongodb.js";
import authRouterState from "./routes/users-auth-routes.js";
import usersRouter from "./routes/users-routes.js";
import usersRouterv2 from "./routes/users-routes-v2.js";
import reagentsRouter from "./routes/reagents-routes.js";
import reagentsStateRouter from "./routes/reagents-state-routes.js";
import csrfRouter from "./route-csurf/csurf-token.js";
import adminRouter from "./routes/admin/admin-routes.js";
import adminUsersRouter from "./routes/admin/users-admin-routes.js";
import adminReagentsRouter from "./routes/admin/reagents-admin-routes.js";
import { userSchemaAccessValidator } from "./middlewares/mid-clean-inputs/validate/users-validate.js";
import { reagentSchemaCreateValidator } from "./middlewares/mid-clean-inputs/validate/reagents-validate.js";
import validate from "./middlewares/mid-clean-inputs/validate/schemas-validate.js";
import { sanitizeUsersInput } from "./middlewares/mid-clean-inputs/sanitize/user-sanitize.js";
import { escapeUserInput } from "./middlewares/mid-clean-inputs/escape/user-escape.js";
import cspMiddleware from "./middlewares/mid-security/csp-middlewares.js";
import { checkUser } from "./middlewares/mid-security/users-authentication/checkUser.js";
import { authentication } from "./middlewares/mid-security/users-authentication/authentication.js";
import { checkAdmin } from "./middlewares/mid-admin/permission-admin.js";
import setCORP from "./middlewares/mid-security/corp-middleware.js";

const app = express();
connectToMongoDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewPath = path.resolve(__dirname, "views");
const publicPath = path.resolve("public");

app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.set("sanitizeFilter", true);
app.use(morgan("dev"));
app.use(helmet());
app.use(cspMiddleware);
setupSwagger(app);

app.use(setCORP);

const userValidation = validate({ body: userSchemaAccessValidator });
const reagentValidation = validate({ body: reagentSchemaCreateValidator });

app.use("/", checkUser, usersRouter);
app.use("/v2", checkUser, usersRouterv2);
app.use(
  "/api/v1/users/auth",
  sanitizeUsersInput,
  escapeUserInput,
  userValidation,
  authRouterState
);
app.use("/api/v1/reagents/:userId", checkUser, authentication, reagentsRouter);
app.use(
  "/api/v1/reagents/auth/:userId",
  checkUser,
  authentication,
  reagentValidation,
  reagentsStateRouter
);
app.use("/api/v1/admin", adminRouter);
app.use(
  "/api/v1/admin/users",
  checkUser,
  authentication,
  checkAdmin,
  adminUsersRouter
);
app.use(
  "/api/v1/admin/reagents",
  checkUser,
  authentication,
  checkAdmin,
  adminReagentsRouter
);
app.use("/api/v1/token", csrfRouter);

app.use("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("404", { message: "Error 404: Page not Found" });
});

app.listen(PORT, () => {
  console.log(
    `✅ Server running at port ${PORT} and ${NODE_ENV} mode on: http://localhost:${PORT}`
  );
});

export default app;
