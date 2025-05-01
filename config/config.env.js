import { config } from "dotenv";

const envPath = `.env.${process.env.NODE_ENV || 'development'}.local`;
config({ path: envPath });

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, JWT_EXPIRES_IN
} = process.env;
