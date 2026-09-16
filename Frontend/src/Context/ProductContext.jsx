import { createContext, useContext, useEffect, useState } from "react";
import { ProductServices } from "../Services/ProductServices";


export const ProductContext=createContext()
export const ProductProvider=({children})=>{

    const [products,setProducts]=useState([]);
    const currency="$"


    const getAllProducts=async()=>{

        try {
            
        const response=await ProductServices.fetchProductData();

        setProducts(response.data.products)
        // console.log(response)

         
      
        return response 
            
        } catch (error) {
            throw error
            
        }
    }


    useEffect(()=>{
        getAllProducts()
                // console.log(products)

    },[])

    return(

        <ProductContext.Provider value={{products,setProducts,currency}}>

            {children}

        </ProductContext.Provider>
    )

}