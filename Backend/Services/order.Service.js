import mongoose from "mongoose";
import User from "../Models/userModel.js";
import Product from "../Models/productModel.js";
import Order from "../Models/orderModels.js";

const requiredAddressFields = [
    "firstName", "lastName", "email", "street", "city",
    "state", "zipCode", "country", "phone",
];

export const createOrderFromCart = async (userId, address, paymentMethod, chapaTxRef) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = new Error("Invalid authenticated user");
        error.statusCode = 401;
        throw error;
    }
    if (!address || requiredAddressFields.some((field) => !String(address[field] || "").trim())) {
        const error = new Error("Complete shipping information is required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(userId).select("cartData");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    const cart = user.cartData || {};
    const cartProductIds = Object.keys(cart).filter((productId) =>
        Object.values(cart[productId] || {}).some((rawQuantity) => Number(rawQuantity) > 0),
    );
    if (cartProductIds.length === 0) {
        const error = new Error("Your cart is empty");
        error.statusCode = 400;
        throw error;
    }

    const products = await Product.find({ _id: { $in: cartProductIds }, isActive: { $ne: false } });
    const productsById = new Map(products.map((product) => [product._id.toString(), product]));
    const items = [];
    let amount = 0;

    for (const productId of cartProductIds) {
        const product = productsById.get(productId);
        if (!product) {
            const error = new Error("One or more products are no longer available");
            error.statusCode = 400;
            throw error;
        }
        for (const [size, rawQuantity] of Object.entries(cart[productId] || {})) {
            const quantity = Number(rawQuantity);
            if (!product.sizes.includes(size)) {
                const error = new Error(`Size ${size} is not available for ${product.name}`);
                error.statusCode = 400;
                throw error;
            }
            if (!Number.isInteger(quantity) || quantity < 1) {
                const error = new Error("Cart quantities must be positive integers");
                error.statusCode = 400;
                throw error;
            }
            if (quantity > product.stock) {
                const error = new Error(`Insufficient stock for ${product.name}`);
                error.statusCode = 400;
                throw error;
            }
            const price = Number(product.price);
            items.push({
                productId: product._id,
                name: product.name,
                image: product.images[0]?.secure_url || "product-image-unavailable",
                size,
                quantity,
                price,
            });
            amount += price * quantity;
        }
    }
    if (items.length === 0) {
        const error = new Error("Your cart is empty");
        error.statusCode = 400;
        throw error;
    }

    return Order.create({
        userId,
        items,
        address,
        amount,
        currency: "ETB",
        paymentMethod,
        payment: paymentMethod === "COD",
        paymentStatus: paymentMethod === "COD" ? "paid" : "pending",
        orderStatus: paymentMethod === "COD" ? "processing" : "pending",
        chapaTxRef,
        date: Date.now(),
    });
};

export const finalizePaidOrder = async (order) => {
    const claimed = await Order.findOneAndUpdate(
        { _id: order._id, paymentStatus: "pending", paymentProcessing: false },
        { $set: { paymentProcessing: true } },
        { new: true },
    );
    if (!claimed) {
        const current = await Order.findById(order._id).select("paymentStatus");
        return current?.paymentStatus === "paid";
    }

    const decremented = [];
    try {
        for (const item of claimed.items) {
            const product = await Product.findOneAndUpdate(
                { _id: item.productId, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true },
            );
            if (!product) throw new Error(`Insufficient stock for ${item.name}`);
            decremented.push(item);
        }
        await Order.updateOne(
            { _id: claimed._id, paymentStatus: "pending", paymentProcessing: true },
            { $set: { paymentStatus: "paid", payment: true, orderStatus: "processing", paymentProcessing: false } },
        );
        await User.findByIdAndUpdate(claimed.userId, { $set: { cartData: {} } });
        return true;
    } catch (error) {
        await Promise.all(decremented.map((item) => Product.updateOne(
            { _id: item.productId },
            { $inc: { stock: item.quantity } },
        )));
        await Order.updateOne({ _id: claimed._id }, { $set: { paymentProcessing: false } });
        throw error;
    }
};