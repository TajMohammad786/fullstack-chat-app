import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev:8000"
    : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("authuser chdck auth ", res.data);
      set({ authUser: res.data });

      const { authUser } = get();
      console.log("authU ", authUser.User._id);
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // user validation failed: username: Path `username` is required.
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log("Signup : ", data);
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("res ", data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      console.log("res in updateProfile", res);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    // console.log("authuser ", authUser.User?._id);

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.User?._id || authUser._id,
      },
      transports: ["websocket"], // Enforce WebSocket
      reconnection: true, // Allow reconnection
      reconnectionAttempts: 5, // Maximum attempts
      reconnectionDelay: 1000, // Delay between attempts
    });
    socket.connect();
    // console.log("socket connected", socket.connected);

    set({ socket: socket });
    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
