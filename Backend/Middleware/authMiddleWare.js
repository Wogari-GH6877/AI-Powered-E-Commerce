import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header

    const authHeader = req.get("Authorization");

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
        success: false,
        message: "Access denied.",
    });
}

const token = authHeader.split(" ")[1];
    // const token = req.header("token");

    console.log(token)
    

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login first.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    // Save decoded payload
    req.user = decoded;

    // Continue to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;