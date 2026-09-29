import User from "../Models/userModel.js";

const adminMiddleware = (req, res, next) => {
  try {
    const verifyAdmin = async () => {
      const user = await User.findById(req.user.id).select("role");
      // console.log(user);
      // console.log(user.role)
      if (!user || user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin only.",
        });
      }

      next();
    };

    verifyAdmin().catch((error) => {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default adminMiddleware;