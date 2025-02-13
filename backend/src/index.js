import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";

dotenv.config();
const server = express();
const PORT = process.env.PORT;

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
server.use(cookieParser());
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use("/api/messages", messageRoutes);

server.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
