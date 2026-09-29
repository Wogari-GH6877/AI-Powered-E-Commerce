import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Config/MongoDB.js";
import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import  "./Config/Cloudinary.js";
import cartRouter from "./Routes/cart.route.js";
import orderRouter from "./Routes/order.route.js";
import paymentRouter from "./Routes/payment.route.js";
import aiRouter from "./Routes/ai.route.js";
import crypto from "crypto";


// const payments=[];
// App Config
const app=express();
// const Port= 3000;
const Port = process.env.PORT || 3000;
connectDB()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ["http://localhost:5177","http://localhost:5174","http://localhost:5173","https://ai-powered-e-commerce-roan.vercel.app/","https://ai-powered-e-commerce-2ias.vercel.app/"
        
//     ,process.env.FRONTEND_URL,process.env.ADMIN_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true
}));
// routes


app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/ai/",aiRouter)
app.get("/",(req,res)=>{
    res.send("Api is Working")
});

// integrate payment into our app

// app.post("/api/payment",(req,res)=>{
//     const {amount,currency}=req.body;

//     const txRef=`ORDER-${Date.now()}`

//     const payment={
//         id:Date.now(),
//         txRef:txRef,
//         amount:amount,
//         currency:currency,
//         status:"panding"
//     }

//     payments.push(payment)

//     console.log("Create Payment",payment);
//     console.log(payments)

//     res.status(201).json(payment)
// });

// app.post("/api/payment/:id/pay",(req,res)=>{
//     const paymentId=Number(req.params.id);
//     console.log(paymentId)
    
//     const payment=payments.find(payment => payment.id===paymentId);

//     if(!payment){
//         res.status(400).json({
//             message:"Payment is not done"
//         })
//     }

//     payment.status="paid"

//     console.log("Payment is succcesfully",payment);

//     // res.json({
//     //     paymentId:paymentId,
//     //     status:"paid",
//     //     message:"successfully"
//     // })

//     res.json(
//         payment
//     )
// });


// app.post("/api/fake-provider/pay/:id",(req,res)=>{
//     const paymentId=Number(req.params.id);

//     const payment=payments.find(payment=>payment.id===paymentId);

//     if(!payment){
//         res.status(404).json({
//          message:"Payment is not found"
//         })
//     }

//     payment.status = "paid";


//     res.status(200).json({
//         id:paymentId,
//         amount:payment.amount,
//         currency:payment.currency,
//         status:"success"
//     })
// })

// app.get("/api/fake-provider/verify/:txRef",(req,res)=>{
//     const txRef=req.params.txRef;

//         console.log("Provider sent txRef:", txRef);

//         const payment=payments.find(payment=>payment.txRef===txRef);

//          if (!payment) {
//         return res.status(404).json({
//             message: "Payment not found"
//         });
//     }

//     res.json({
//         txRef: payment.txRef,
//         amount: payment.amount,
//         currency: payment.currency,
//         status: "success"
//     });

// })


// const getVerifiedPayment = async ({ data }) => {

//     const payment = payments.find(
//         payment => payment.txRef === data.txRef
//     );

//     if (!payment) {
//         throw new Error("Payment not found");
//     }

//     if (payment.amount !== data.amount) {
//         throw new Error("Payment amount does not match");
//     }

//     if (payment.currency !== data.currency) {
//         throw new Error("Payment currency does not match");
//     }

//     if (data.status !== "success") {
//         throw new Error("Payment was not successful");
//     }

//     payment.status = "paid";

//     return payment;
// };

// app.get("/api/payments/:txRef/verify", async (req, res) => {
//     try {
//         const txRef = req.params.txRef;

//         const payment = payments.find(
//             payment => payment.txRef === txRef
//         );

//         if (!payment) {
//             return res.status(404).json({
//                 message: "Payment not found"
//             });
//         }

//         const providerResponse = {
//             txRef: payment.txRef,
//             amount: payment.amount,
//             currency: payment.currency,
//             status: "success"
//         };

//         const verifiedPayment = await getVerifiedPayment({
//             data: providerResponse
//         });

//         res.json({
//             message: "Payment verified successfully",
//             payment: verifiedPayment
//         });

//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// });
// const getVerifiedPayment=async({data})=>{
 
//     const payment=payments.find(payment=>payment.txRef===data.txRef);
//     if (!payment) {
//         return res.status(404).json({
//             message: "Payment not found"
//         });

//     if(payment.amount!==data.amount){
//         return
//     }

//     if(payment.currency!==data.currency){
//         return
//     }
// }

// import crypto from "crypto";

// app.post("/api/payment/chapa", async (req, res) => {
//     try {
//         const { amount } = req.body;

//         const txRef = `ORDER-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

//         const response = await fetch(
//             "https://api.chapa.co/v1/transaction/initialize",
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     amount: String(amount),
//                     currency: "ETB",
//                     email: "customer@gmail.com",
//                     first_name: "Test",
//                     last_name: "Customer",
//                     tx_ref: txRef
//                 })
//             }
//         );

//         const data = await response.json();

//         // res.json(data);

//         res.json({
//            success:true ,
//     txRef: txRef,
//     checkoutUrl: data?.data?.checkout_url
// });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// app.post("/api/payment/chapa", async (req, res) => {
//     try {
//         // const { amount } = req.body;

//         const amount=10;

//         const txRef = `ORDER-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

//         console.log("Sending payment to Chapa:", {
//             amount,
//             txRef
//         });

//         const response = await fetch(
//             "https://api.chapa.co/v1/transaction/initialize",
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     amount: String(amount),
//                     currency: "ETB",
//                     email: "customer@gmail.com",
//                     first_name: "Test",
//                     last_name: "Customer",
//                     tx_ref: txRef,
//                     return_url: "http://localhost:5173/payment/callback",
//                 })
//             }
//         );

//         console.log("Chapa HTTP status:", response.status);

//         const data = await response.json();

//         console.log("Chapa response:", data);

//         if (!response.ok || data.status === "failed") {
//             return res.status(400).json({
//                 success: false,
//                 message: data.message || "Chapa payment initialization failed"
//             });
//         }

//         return res.json({
//             success: true,
//             txRef: txRef,
//             checkoutUrl: data?.data?.checkout_url
//         });

//     } catch (error) {
//         console.error("Chapa fetch error:", error);

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });


// app.get("/api/payment/chapa/verify/:txRef", async (req, res) => {
//   try {
//     const { txRef } = req.params;

//     const response = await fetch(
//       `https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(txRef)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok || data.status === "failed") {
//       return res.status(400).json({
//         success: false,
//         message: data.message || "Payment verification failed",
//       });
//     }

//     const payment = data.data;

//     // For now, just inspect what Chapa verified
//     console.log("Verified transaction:", payment);

//     if (payment.status !== "success") {
//       return res.status(400).json({
//         success: false,
//         message: "Payment was not successful",
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Payment verified",
//       payment,
//     });

//   } catch (error) {
//     console.error("Verification error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.get("/api/payment/chapa/callback", (req, res) => {
//   console.log(" Chapa called my backend!");

//   console.log("Data from Chapa:", req.query);

//   res.json({
//     message: "Callback received",
//     data: req.query,
//   });
// });
app.listen(Port,"0.0.0.0",()=>{
 console.log(`The Server is Listening at Port ${Port}`)
})