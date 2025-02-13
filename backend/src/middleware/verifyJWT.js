
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  try {
    if (!token) {
      throw new Error("No Token Provided");
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid Token");
    }
    
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    let statusCode = 401;
    let message = "Authentication failed";
    
    if (error.message === "No Token Provided") {
      message = "No Token Provided";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid Token";
    } else if (error.name === "TokenExpiredError") {
      message = "Token has expired";
    } else if (error.message === "User not found") {
      message = "User not found";
      statusCode = 404;
    }
    
    res.status(statusCode).json({ message });
  }
};
