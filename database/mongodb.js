import mongoose from "mongoose";
import { DB_URI } from "../config/config.env.js";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Connected to the database!");
  } catch (err) {
    console.error("❌ Error to cocnect to MongoDB:", err.message);
    console.error("Erro completo:", err);
  }
};

export default connectToMongoDB;
