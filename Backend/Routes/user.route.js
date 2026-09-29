import express from "express";
import { registerUser,loginUser } from "../Controller/user.controller.js";
import adminMiddleware from "../Middleware/adminMiddleWare.js";
import authMiddleware from "../Middleware/authMiddleWare.js";
const userRouter = express.Router();

//
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);



export default userRouter;