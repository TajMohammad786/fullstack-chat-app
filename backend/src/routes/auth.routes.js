import express from "express";
import {login, signup, logout,updateProfile, checkAuth} from "../controller/auth.controller.js";
import {verifyJWT} from "../middleware/verifyJWT.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.put("/update-profile", verifyJWT,updateProfile);
router.get("/check", verifyJWT, checkAuth);


export default router;
