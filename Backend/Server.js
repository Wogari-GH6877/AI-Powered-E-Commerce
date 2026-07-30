import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Config/MongoDB.js";
import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import  "./Config/Cloudinary.js";
import cartRouter from "./Routes/cart.route.js";
import orderRouter from "./Routes/order.route.js";

// App Config
const app=express();
const Port= 3000;
connectDB()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5177","http://localhost:5174","http://localhost:5173",
        process.env.CLIENT_URL1,process.env.ADMIN_URL1,
    process.env.CLIENT_URL2,process.env.ADMIN_URL2],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// routes

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
    res.send("Api is Working")
})
app.listen(Port,()=>{
 console.log(`The Server is Listening at Port ${Port}`)
})