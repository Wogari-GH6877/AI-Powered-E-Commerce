import express from "express";
import { addProduct, deleteProduct, listProduct, listSingleProduct } from "../Controller/product.controller.js";
import upload from "../Middleware/multer.js";
import authMiddleware from "../Middleware/authMiddleWare.js";
import adminMiddleware from "../Middleware/adminMiddleWare.js";

const productRouter = express.Router();

//
productRouter.post("/add",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", deleteProduct);
productRouter.post("/single-product", listSingleProduct);




export default productRouter;