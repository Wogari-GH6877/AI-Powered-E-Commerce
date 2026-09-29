import productModel from "../Models/productModel.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";


export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Invalid price.",
      });
    }

    let parsedSizes = [];

    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes format.",
      });
    }

    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required.",
      });
    }

    // const uploadedImages = [];

    // for (const image of images) {
    //   const result = await uploadToCloudinary(image.buffer);

    //   uploadedImages.push({
    //     public_id: result.public_id,
    //     secure_url: result.secure_url,
    //   });
    // }

    const uploadedImages = await Promise.all(
  images.map(async (image) => {
    const result = await uploadToCloudinary(image.buffer);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  })
);

    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true",
      images: uploadedImages,
      date: Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      success: true,
      message:"Product Listed successfully",
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Delete all images from Cloudinary
    await Promise.all(
      product.images.map((image) =>
        deleteFromCloudinary(image.public_id)
      )
    );

    // Delete product from MongoDB
    await productModel.findByIdAndDelete(product._id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const listSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};