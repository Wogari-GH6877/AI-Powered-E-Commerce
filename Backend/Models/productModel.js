import mongoose from "mongoose";
import {
    CATEGORIES,
    SUB_CATEGORIES,
    SIZES} from "../Constant/product.constants.js"

const productSchema = new mongoose.Schema(
  {
    // Product Name
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    // Product Description
    description: {
      type: String,
      required: [true, "Product description is required."],
      trim: true,
    },

    // Original Price
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Price cannot be negative."],
    },

    // Discount Price (Optional)
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Available Stock
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Product Images from Cloudinary
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],

    // Product Category
    category: {
      type: String,
      required: true,
      trim: true,
      enum: CATEGORIES
    },

    // Product Sub Category
    subCategory: {
      type: String,
      required: true,
      trim: true,
      enum: SUB_CATEGORIES
    },

    // Available Sizes
    sizes: {
      type: [String],
      enum: SIZES,
      default: [],
    },

    // Brand
    brand: {
      type: String,
      trim: true,
    },

    // Product Rating
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Total Reviews
    numReviews: {
      type: Number,
      default: 0,
    },

    // Featured Product
    isFeatured: {
      type: Boolean,
      default: false,
    },


    bestseller:{
      type:Boolean,
      default:false
    },
    // Product Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.product || mongoose.model("Product", productSchema);

export default Product;