import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Which user placed this order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Snapshot of purchased products
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // Shipping Address
    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      enum: ["ETB"],
      default: "ETB",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Chapa", "Stripe", "PayPal"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    chapaTxRef: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentProcessing: {
      type: Boolean,
      default: false,
    },

    payment: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
mongoose.model("Order", orderSchema);