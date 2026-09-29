import orderModels from "../Models/orderModels.js";
import User from "../Models/userModel.js";

const statusLabels = {
    pending: "Order Placed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

// palxing orders using COD method
const placeOrder=async(req,res)=>{

    try {
        const {items,amount,address}=req.body;
                const userId = req.user.id;


        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModels(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId,{cartData:{}});

        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Placing orders using Stripe method
const placeOrderStripe=async(req,res)=>{

}

const placeOrderRazorPay=async(req,res)=>{

}


// All orders for Admin Panel

const allOrders=async(req,res)=>{
    try {
        const orders = await orderModels.find({})
            .populate("userId", "name email")
            .populate("items.productId", "images")
            .sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// User Order Data for Frontend

const userOrders=async(req,res)=>{
    try {
        const userId = req.user.id || req.user._id;
        const orders = await orderModels.find({ userId })
            .populate("items.productId", "images")
            .sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//update order states from admin panel

const updateStatus=async(req,res)=>{
    try {
        const { orderId, status } = req.body;
        if (!orderId || !statusLabels[status]) {
            return res.status(400).json({ success: false, message: "Order ID and a valid status are required" });
        }
        const order = await orderModels.findByIdAndUpdate(
            orderId,
            { $set: { orderStatus: status, status: statusLabels[status] } },
            { new: true },
        );
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        return res.json({ success: true, message: "Order status updated", order });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
} 


export  {placeOrder,placeOrderRazorPay,placeOrderStripe,allOrders,userOrders,updateStatus}