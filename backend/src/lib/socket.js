import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev",
      "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev:8000",
    ],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("user", userId);
  if (userId && userId != "undefined") userSocketMap[userId] = socket.id;

  // console.log("socketmap ", userSocketMap);
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", (data) => {
    const receiverSocketId = getReceiverSocketId(data.user); // Find the socket ID of the selected user
    // console.log(
    //   `User ${socket.id} is typing for ${data.user} (Socket: ${receiverSocketId})`,
    // );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", {
        userId: socket.handshake.query.userId,
      });
    }
  });

  socket.on("stopTyping", (data) => {
    const receiverSocketId = getReceiverSocketId(data.user); // Find the socket ID of the selected user
    // console.log(
    //   `User ${socket.id} stopped typing for ${data.user} (Socket: ${receiverSocketId})`,
    // );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", {
        userId: socket.handshake.query.userId,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
