import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: 2,
      maxlength: 50,
      trim:true
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;