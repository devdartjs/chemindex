import { config } from "dotenv";
const envPath = `.env.${process.env.NODE_ENV || "development"}.local`;
config({
  path: envPath
});
export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_SECRET_ADMIN,
  JWT_EXPIRES_IN_ADMIN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_STATUS,
  ADMIN_CREATION_TOKEN,
  ARCJET_ENV,
  ARCJET_KEY
} = process.env;