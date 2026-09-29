
import User from "../Models/userModel.js";
import Product from "../Models/productModel.js";

// ==========================================
// ADD ITEM TO CART
// ==========================================
export const addItemToCart = async (body, userId) => {
    const { itemId, size } = body;

    // 1. Validate request
    if (!itemId || !size) {
        return {
            success: false,
            statusCode: 400,
            message: "Product ID and size are required",
        };
    }

    // 2. Find user
    const userData = await User.findById(userId);

    if (!userData) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }

    // 3. Find product
    const product = await Product.findById(itemId);

    if (!product) {
        return {
            success: false,
            statusCode: 404,
            message: "Product not found",
        };
    }

    // 4. Check whether selected size is valid
    if (!product.sizes.includes(size)) {
        return {
            success: false,
            statusCode: 400,
            message: "Selected size is not available",
        };
    }

    // 5. Get user's cart
    const cartData = userData.cartData || {};

    // 6. Create product entry if it doesn't exist
    if (!cartData[itemId]) {
        cartData[itemId] = {};
    }

    // 7. Increase quantity
    if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
    } else {
        cartData[itemId][size] = 1;
    }

    // 8. Save cart
    await User.findByIdAndUpdate(userId, {
        cartData,
    });

    return {
        success: true,
        statusCode: 200,
        message: "Added to cart",
    };
};


// ==========================================
// UPDATE CART ITEM
// ==========================================
export const upDateCartItem = async (body, userId) => {
    const { itemId, size, quantity } = body;

    // 1. Validate required fields
    if (!itemId || !size) {
        return {
            success: false,
            statusCode: 400,
            message: "Product ID and size are required",
        };
    }

    // 2. Validate quantity
    if (!Number.isInteger(quantity) || quantity < 0) {
        return {
            success: false,
            statusCode: 400,
            message: "Quantity must be a non-negative integer",
        };
    }

    // 3. Find user
    const userData = await User.findById(userId);

    if (!userData) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }

    // 4. Get cart
    const cartData = userData.cartData || {};

    // 5. Check product exists in cart
    if (!cartData[itemId]) {
        return {
            success: false,
            statusCode: 404,
            message: "Product is not in cart",
        };
    }

    // 6. Check size exists in cart
    if (!cartData[itemId][size]) {
        return {
            success: false,
            statusCode: 404,
            message: "This size is not in cart",
        };
    }

    // 7. If quantity is 0, remove the size
    if (quantity === 0) {
        delete cartData[itemId][size];

        // If product has no sizes left, remove product
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }
    } else {
        // Otherwise update quantity
        cartData[itemId][size] = quantity;
    }

    // 8. Save cart
    await User.findByIdAndUpdate(userId, {
        cartData,
    });

    return {
        success: true,
        statusCode: 200,
        message: "Cart updated",
    };
};


// ==========================================
// GET USER CART
// ==========================================
export const getUserCart = async (userId) => {

    // 1. Find user
    const userData = await User.findById(userId);

    if (!userData) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }

    // 2. Return cart
    return {
        success: true,
        statusCode: 200,
        cartData: userData.cartData || {},
    };
};





