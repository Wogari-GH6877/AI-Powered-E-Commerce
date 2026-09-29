import express from "express"
import { addToCart, getCart, upDateCart } from "../Controller/cart.controller.js";
import authMiddleware from "../Middleware/authMiddleWare.js";


const cartRouter=express.Router();


cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/update",authMiddleware,upDateCart)
cartRouter.get("/get",authMiddleware,getCart);

export default cartRouter