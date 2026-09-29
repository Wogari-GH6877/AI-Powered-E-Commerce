import jwt from "jsonwebtoken"

export const generateToken = (user) => {

  // console.log(user)
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d" // token expiration time
    }
  );

  return token;
};