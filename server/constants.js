import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;
export const mongoURL = process.env.MONGO_URI;
