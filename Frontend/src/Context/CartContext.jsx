import { createContext, useContext ,useEffect} from "react";
import { AuthContext } from "./AuthContext";
import { cartServices } from "../Services/cartServices";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "./ProductContext";

export const CartContext=createContext()

export const CartContextProvider=({children})=>{

        const [cartItems,setCartItems]=useState({});
        const {token}=useContext(AuthContext);

        const {products}=useContext(ProductContext)



        const addToCart= async(itemId,size)=>{

        if(!size){
            toast.error('Select Product Size');
            return;
        }
        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }

            else{
                cartData[itemId][size]=1;
            }
        } else{
            cartData[itemId]={};
            cartData[itemId][size]=1
        }

        setCartItems(cartData)

        if(token){
            try {
                 
                const response=await cartServices.addItemToCart(itemId,size,token);
                console.log(response)

                if(response.data.success)
                    {toast.success(response.data.message)}
//                
            } catch (error) {
                console.log(error.message);
               toast.error(error.response.data.message)
                
            }
        }

    }




        const getCart=async(token)=>{
        
            


                if(token){
            try {
                 
                const response=await cartServices.getUserCart(token);
                console.log(response)

                if(response.data.success)
                    {    setCartItems(response.data.cartData);

                        toast.success(response.data.message)
                    }

            } catch (error) {
    console.error(error);
    toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
    );
}
        }}

        
    const getCartCount=()=>{

        let totalCount=0;

        for (const productId in  cartItems){
            for (const size in cartItems[productId]){
                const quantity=cartItems[productId][size];

                if(quantity>0){
                    totalCount+=quantity;
                }
            }
        }

        return totalCount;
    }


    const updateQuantity= async(itemId,size,quantity)=>{

        let cartData= structuredClone(cartItems);

        cartData[itemId][size]=quantity;
        setCartItems(cartData);

        if(token){
            try {
                 
                const response = await cartServices.updateItemQuantity(itemId,size,quantity)
                console.log(response)
    
            } catch (error) {
                console.log(error.message);
               toast.error(error.response.data.message)
                
            }
         
    }}

    const getCartAmount = ()=>{
        let totalAmount=0;


        console.log("cartItems:", cartItems);
           console.log("products:", products);

        for (const items in cartItems){
            
            let itemInfo=products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
            console.log("Current cart product id:", items);
            console.log("Found product:", itemInfo);

                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item]

                    }
                } catch (error) {
                    console.log(error.message);
               toast.error(error.message)
                }
            }
        }
        return totalAmount


    }

    useEffect(()=>{
        if(token && localStorage.getItem('token')){
            // setToken(localStorage.getItem("token"))
            getCart(localStorage.getItem("token"))
        }
    },[token])
    return(

        <CartContext.Provider value={{getCartCount,addToCart,cartItems,setCartItems,updateQuantity,getCartAmount}}>
            {children}

        </CartContext.Provider>

    )
}