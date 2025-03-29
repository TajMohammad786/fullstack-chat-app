import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

app.use(
  cors({
    origin: [
      "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev",
      "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev:8000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);
const __dirname =  path.resolve(); 
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
