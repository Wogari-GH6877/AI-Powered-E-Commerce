import crypto from "crypto";
import Order from "../Models/orderModels.js";
import { createOrderFromCart, finalizePaidOrder } from "../Services/order.Service.js";
import { initializePayment, verifyPayment } from "../Services/chapa.Service.js";

const frontendUrl = () => process.env.FRONTEND_URL || process.env.CLIENT_URL1 || "http://localhost:5173";
const backendUrl = () => process.env.BACKEND_URL || "http://localhost:3000";
const chapaCallbackUrl = () => process.env.CHAPA_CALLBACK_URL || `${backendUrl()}/api/payment/chapa/callback`;
const chapaReturnUrl = (txRef) => process.env.CHAPA_RETURN_URL
    ? `${process.env.CHAPA_RETURN_URL}?tx_ref=${encodeURIComponent(txRef)}`
    : `${frontendUrl()}/payment/callback?tx_ref=${encodeURIComponent(txRef)}`;

const normalizeEthiopianPhone = (phone) => {
    const digits = String(phone || "").replace(/\D/g, "");
    const localNumber = digits.startsWith("251") ? `0${digits.slice(3)}` :
        digits.startsWith("9") || digits.startsWith("7") ? `0${digits}` : digits;
    if (!/^0[79]\d{8}$/.test(localNumber)) {
        const error = new Error("Use an Ethiopian mobile number such as 0912345678");
        error.statusCode = 400;
        throw error;
    }
    return localNumber;
};

const getVerifiedPayment = async (order, txRef) => {
    const result = await verifyPayment(txRef);
    const data = result.data || {};
    if (String(data.tx_ref || data.trx_ref) !== String(order.chapaTxRef) ||
        data.status !== "success" || Number(data.amount) !== order.amount ||
        String(data.currency || "").toUpperCase() !== order.currency) {
        const error = new Error("Payment verification did not match the order");
        error.statusCode = 400;
        throw error;
    }
    return data;
};

export const createPayment = async (req, res) => {
    try {
        const txRef = `ORDER-${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
        const address = { ...req.body.address, phone: normalizeEthiopianPhone(req.body.address?.phone) };
        const order = await createOrderFromCart(req.user.id, address, "Chapa", txRef);

        console.log("CHAPA_RETURN_URL:", process.env.CHAPA_RETURN_URL);
console.log("Generated return URL:", chapaReturnUrl(txRef));
console.log("Generated callback URL:", chapaCallbackUrl());
        const chapaResponse = await initializePayment({
            amount: String(order.amount),
            currency: "ETB",
            email: order.address.email,
            first_name: order.address.firstName,
            last_name: order.address.lastName,
            phone_number: order.address.phone,
            tx_ref: txRef,
            callback_url: chapaCallbackUrl(),
            return_url: chapaReturnUrl(txRef),
        });
        return res.status(201).json({ success: true, orderId: order._id, txRef, checkoutUrl: chapaResponse.data?.checkout_url });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Unable to create payment" });
    }
};

export const verifyOrderPayment = async (req, res) => {
    try {
        const order = await Order.findOne({ chapaTxRef: req.params.txRef, userId: req.user.id });
        if (!order) return res.status(404).json({ success: false, message: "Payment order not found" });
        if (order.paymentStatus === "paid") return res.json({ success: true, paid: true, orderId: order._id, order });
        await getVerifiedPayment(order, req.params.txRef);
        await finalizePaidOrder(order);
        const paidOrder = await Order.findById(order._id);
        return res.json({ success: true, paid: true, orderId: order._id, order: paidOrder });
    } catch (error) {
        return res.status(error.statusCode || 400).json({ success: false, paid: false, message: error.message || "Payment is not confirmed" });
    }
};

export const chapaCallback = async (req, res) => {
    const txRef = req.query.trx_ref || req.query.tx_ref;
    if (txRef) {
        try {
            const order = await Order.findOne({ chapaTxRef: txRef });
            if (order && order.paymentStatus !== "paid") {
                await getVerifiedPayment(order, txRef);
                await finalizePaidOrder(order);
            }
        } catch (error) {
            console.error("Chapa callback verification failed:", error.message);
        }
    }
    return res.redirect(`${frontendUrl()}/payment/callback?tx_ref=${encodeURIComponent(txRef || "")}`);
};

export const chapaWebhook = async (req, res) => {
    const secret = process.env.CHAPA_WEBHOOK_SECRET;
    const signature = req.get("chapa-signature") || req.get("x-chapa-signature");
    if (!secret || !signature) return res.status(401).json({ success: false, message: "Invalid webhook signature" });
    const expected = crypto.createHmac("sha256", secret).update(JSON.stringify(req.body)).digest("hex");
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
        return res.status(401).json({ success: false, message: "Invalid webhook signature" });
    }
    const txRef = req.body.tx_ref || req.body.trx_ref;
    if (!txRef) return res.status(400).json({ success: false, message: "Transaction reference is required" });
    try {
        const order = await Order.findOne({ chapaTxRef: txRef });
        if (!order || order.paymentStatus === "paid") return res.status(200).json({ success: true });
        await getVerifiedPayment(order, txRef);
        await finalizePaidOrder(order);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Webhook verification failed" });
    }
};