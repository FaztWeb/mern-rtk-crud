import mongoose from "mongoose";
import { DB_URL } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.error(error);
  }
}
