import express from "express";
import {verifyJWT} from "../middleware/verifyJWT.js";
import {getUsersForSidebar, getMessages, sendMessages} from "../controller/message.controller.js";

const router =  express.Router();

router.get("/users", verifyJWT, getUsersForSidebar);
router.get("/:id", verifyJWT, getMessages);

router.post("/send/:id", verifyJWT, sendMessages);

export default router;