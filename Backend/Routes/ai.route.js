import express from "express"
import authMiddleware from "../Middleware/authMiddleWare.js";
// import adminMiddleware from "../Middleware/adminMiddleWare.js";
import { generateChatResponseController, generateProductDescriptionController } from "../Controller/ai.controller.js";
import upload from "../Middleware/multer.js";
const aiRouter=express.Router();


aiRouter.post("/product-description",authMiddleware,  upload.single("image"),
generateProductDescriptionController);

aiRouter.post("/chat",authMiddleware,generateChatResponseController);



export default aiRouter