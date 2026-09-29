import Product from "../Models/productModel.js";

export const searchProducts = async ({
  category,
  subCategory,
  maxPrice,
  size,
  brand,
}) => {
  const query = {
    isActive: true,
    stock: { $gt: 0 },
  };

  if (category) {
    query.category = category;
  }

  if (subCategory) {
    query.subCategory = subCategory;
  }

  if (size) {
    query.sizes = size;
  }

  if (brand) {
    query.brand = brand;
  }

  if (maxPrice !== undefined) {
    query.$or = [
      {
        price: { $lte: maxPrice },
        discountPrice: 0,
      },
      {
        discountPrice: {
          $gt: 0,
          $lte: maxPrice,
        },
      },
    ];
  }

  const products = await Product.find(query)
    .select(
      "name description price discountPrice sizes brand averageRating numReviews images"
    )
    .limit(10)
    .lean();

  return products;
};