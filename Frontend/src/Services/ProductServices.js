
import api from "./Axios";


export const ProductServices={
   
    fetchProductData:async()=>{
        const response=await api.get("/api/product/list");

        return response

    }

}