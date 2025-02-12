import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";

dotenv.config();
const server = express();
const PORT = process.env.PORT || 5001;

server.use(cors({
  origin: "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev",
  credentials: true
}));
server.use(cookieParser());
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use("/api/messages", messageRoutes);

server.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
