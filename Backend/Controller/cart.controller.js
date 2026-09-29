import User from "../Models/userModel.js";
import { addItemToCart, upDateCartItem ,getUserCart} from "../Services/cart.Service.js";


export const addToCart=async(req,res)=>{


    try {

        const result=await addItemToCart(req.body,req.user.id);

        if(!result.success){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(
      result)
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export const upDateCart=async(req,res)=>{
    try {

        const result=await upDateCartItem(req.body,req.user.id);

        if(!result.success){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(
      result)
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export const getCart=async(req,res)=>{
    try {

        const result=await getUserCart(req.user.id);

        if(!result.success){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(
      result)
        
        

        

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}