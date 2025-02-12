import jwt from "jsonwebtoken";

export const generateJWTToken = async(userId, res)=>{
  const token = jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: "1d"});

  res.cookie("jwt", token, {
    maxAge: 7*24*60*60*1000,
    httpOnly: true, 
    secure: true, 
    sameSite: "none"
  });
  
  return token;
}


