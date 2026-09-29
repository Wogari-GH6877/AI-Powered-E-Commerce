import api from "./Axios";

export const cartServices={


     addItemToCart :async(itemId,size,token)=>{

        

        if(token){
           
                 
                const response=await api.post("/api/cart/add",{itemId,size});
                console.log(response)

                return response;

                
            
        }

    }
,


     


    getUserCart:async(token)=>{
            
                
    
    
                    if(token){
                
                     
                    const response=await api.get("/api/cart/get");
                    console.log(response)
    
                    return response;
    
                
                }
            }
,


    updateItemQuantity:async(itemId,size,quantity)=>{

        
        
            
                 
                const response=await api.post( "/api/cart/update",{itemId,size,quantity})

                return response
    
         
    

}}