import { createContext,useContext,useEffect,useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../Services/Axios";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { ProductContext } from "./ProductContext";
export const ShopContext = createContext();

const ShopContextContextProvider = (props) => {



    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch]=useState("");
    const [showSearch,setShowSearch]=useState(false);

    const {cartItems,setCartItems}=useContext(CartContext);
    const {products}=useContext(ProductContext)
    // const [cartItems,setCartItems]=useState({});
    const {token}=useContext(AuthContext)
    // const [token,setToken]=useState("");
//     const [products,setProducts]=useState([])

    const navigate=useNavigate()




    const value = {
          currency, search
        ,setSearch,showSearch,setShowSearch,
        navigate,delivery_fee
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextContextProvider;