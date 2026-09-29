import express from "express"

import  {placeOrder,placeOrderRazorPay,placeOrderStripe,allOrders,userOrders,updateStatus}
from "../Controller/order.controller.js"
import authMiddleware from "../Middleware/authMiddleWare.js";
import adminMiddleware from "../Middleware/adminMiddleWare.js";

const orderRouter=express.Router();


//admin feature
orderRouter.post("/list",authMiddleware,adminMiddleware,allOrders)

orderRouter.post("/status",authMiddleware,adminMiddleware,updateStatus)

//Payment Features

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/stripe",adminMiddleware,placeOrderStripe)
orderRouter.post("/razorpay",adminMiddleware,placeOrderRazorPay)


// 
orderRouter.get("/userorders",authMiddleware,userOrders)
orderRouter.post("/userorders",authMiddleware,userOrders)



export default orderRouter