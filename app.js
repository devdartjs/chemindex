import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { PORT, NODE_ENV } from "./config/config.env.js";
import connectToMongoDB from "./database/mongodb.js";
import authRouterState from "./routes/users.auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import reagentsRouter from "./routes/reagents.routes.js";
import reagentsStateRouter from "./routes/reagents.state.routes.js";
import csrfRouter from "./route.csurf/csurf.token.js";
import adminRouter from "./routes/admin/admin.routes.js";
import adminUsersRouter from "./routes/admin/users.admin.routes.js";
import adminReagentsRouter from "./routes/admin/reagents.admin.routes.js";
import { userSchemaAccessValidator } from "./mid-clean-inputs/validate/users.validate.js";
import { reagentSchemaCreateValidator } from "./mid-clean-inputs/validate/reagents.validate.js";
import validate from "./mid-clean-inputs/validate/schemas.validate.js";
import { sanitizeUsersInput } from "./mid-clean-inputs/sanitize/user.sanitize.js";
import { escapeUserInput } from "./mid-clean-inputs/escape/user.escape.js";
import cspMiddleware from "./mid-security/csp.middlewares.js";
import setCORP from "./mid-security/corp.middleware.js";
import {
  checkUser,
  authentication,
} from "./mid-security/users.authentication.js";
import { checkAdmin } from "./mid-admin/permission.admin.js";
import arcjetMiddleware from "./mid-security/arcjet.middleware.js";
// import { redirectIfLoggedIn } from './mid-functions/redirectIfLoggedIn.js';

const app = express();
connectToMongoDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewPath = path.resolve(__dirname, "views");
const publicPath = path.resolve(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cookieParser());
mongoose.set("sanitizeFilter", true);
app.use(morgan("dev"));
app.use(helmet());
app.use(cspMiddleware);
app.use(setCORP);
// app.use(cors);

const userValidation = validate({ body: userSchemaAccessValidator });
const reagentValidation = validate({ body: reagentSchemaCreateValidator });

app.use("/", arcjetMiddleware, checkUser, usersRouter);
app.use(
  "/api/v1/users/auth",
  sanitizeUsersInput,
  escapeUserInput,
  userValidation,
  authRouterState
);
app.use(
  "/api/v1/reagents/:userId",
  arcjetMiddleware,
  checkUser,
  authentication,
  reagentsRouter
);
app.use(
  "/api/v1/reagents/auth/:userId",
  arcjetMiddleware,
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
  res.status(400).render("404", { message: "Error 404: Page not Found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT} and ${NODE_ENV} mode`);
});

export default app;
