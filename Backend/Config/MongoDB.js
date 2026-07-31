import mongoose from "mongoose";

const connectDB=async ()=>{

    if (!process.env.MONGODB_URI){
        throw new Error("MONGODB_URI is not defined.")
    }

     mongoose.connection.on("connected",()=>{
        console.log("DB Connected Successfully");
    })

    mongoose.connection.on("error",(err)=>{
        console.error("[Error : ] MongoDB Run Time Error:",err.message);
    })

    mongoose.connection.on("disconnected",()=>{
        console.warn("[Warn] : Mongodb disconnected");
    })

    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Host: ${conn.connection.host}`);


    } catch (error) {
        console.error("[Error] : DB Connection is Failed: ", error.message);
        process.exit(1);
        
    }

   
}

export default connectDB;