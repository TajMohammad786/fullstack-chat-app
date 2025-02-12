
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "https://b3f8f773-e70a-444e-b53a-639ec87ca0c9-00-2omyig557gis6.spock.replit.dev/api" 
    : "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
