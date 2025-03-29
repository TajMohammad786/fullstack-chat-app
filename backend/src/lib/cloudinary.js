import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dyexqowj2",
  api_key: "794891133215838",
  api_secret: "paL7IQgzeCuO7q0wriZDXVpX9sk",
});

export default cloudinary;
