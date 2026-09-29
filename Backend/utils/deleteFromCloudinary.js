import cloudinary from "../Config/Cloudinary.js";

const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default deleteFromCloudinary;