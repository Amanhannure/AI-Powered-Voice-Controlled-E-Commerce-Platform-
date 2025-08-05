
import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default connectDB();