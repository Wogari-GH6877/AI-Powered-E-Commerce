import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";
import validator from "validator"
import { generateToken } from "../utils/generateToken.js";



export const register = async (body) => {
  


    const { name, email, password } = body

    // 1. Basic validation
    if (!name || !email || !password) {
      return { success: false,statusCode:400, message: "Please provide all required fields." };
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return { success: false,statusCode:409, message: "User already exists with this email." };
    }

    if(!validator.isEmail(email)){
        return {success:false,statusCode:400,message:"Please enter a valid email"}
    }

    if (password.length < 8) {
        return {
            success: false,
            statusCode:400,
            message: "Password must be at least 8 characters long.",
        };
    }
    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Generate token & send response
    const token = generateToken(user);
     

    return {
      success: true,
      statusCode:201,
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

  
};




export const login = async (body) => {

    

        const { email, password } = body;

        if ( !email || !password) {
       return { success: false,statusCode:400, message: "Please provide all required fields." };
      }



        const user = await userModel.findOne({ email });


        if (!user) {
            return {
              success:false,
              statusCode:401,
                message: "InValid credentails"
            };
        }


        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            return {
              success:false,
              statusCode:401,
                message: "Invalid credentials"
            };
        }


        const token = generateToken(user)

        return {

          success:true,
          statusCode:200,
            message:"Login successful",
            token,
            
        };


    

    }




