import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifyJWT = async (req, res, next) =>{
  
  const token = req.cookies.jwt;
  try {
    if (!token)  {
      res.status(401).json({ message: "No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decoded){
      res.status(401).json({ message: "Invalid Token" });
    }
    const user = await User.findById(decoded._id).select("-password");
    if(!user){
      res.status(401).json({ message: "Invalid Token" });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}