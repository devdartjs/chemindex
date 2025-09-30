import mongoose from "mongoose";
import { DB_URI } from "../config/config-env.js";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Connected to the database!");
  } catch (err) {
    console.error("❌ Error to connect database:", err.message);
    console.error("Error:", err);
  }
};

export default connectToMongoDB;
