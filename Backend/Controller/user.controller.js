import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import {  register,login } from "../Services/auth.Service.js";



export const registerUser = async (req, res) => {
  try {
     const result=await register(req.body)
     
     if(!result.success){
        return res.status(result.statusCode).json(result);

     }
    
     return res.status(result.statusCode).json(
      result)

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




export const loginUser = async (req, res) => {

    try {

      const result=await login(req.body);

      if(!result.success){
        return res.status(400).json(result)
      }

      return res.status(result.statusCode).json({
      ...result
    })

      

        
    } catch(error){

        return res.status(500).json({
            message:error.message
        });

    }

};


