import express from "express";
import authMiddleware from "../Middleware/authMiddleWare.js";
import { chapaCallback, chapaWebhook, createPayment, verifyOrderPayment } from "../Controller/payment.controller.js";

const paymentRouter = express.Router();
paymentRouter.post("/create", authMiddleware, createPayment);
paymentRouter.get("/verify/:txRef", authMiddleware, verifyOrderPayment);
paymentRouter.get("/chapa/callback", chapaCallback);
paymentRouter.post("/chapa/webhook", chapaWebhook);

export default paymentRouter;