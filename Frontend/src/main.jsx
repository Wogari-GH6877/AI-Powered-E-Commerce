import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import ShopContextContextProvider from './Context/ShopContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { ProductProvider } from './Context/ProductContext.jsx';
import { CartContextProvider } from './Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
          <AuthProvider>

        <ProductProvider>
          <CartContextProvider>
                <ShopContextContextProvider>

            <App />

                </ShopContextContextProvider>

          </CartContextProvider>
          
        </ProductProvider>
         
       
          </AuthProvider>

      
  </BrowserRouter>
   </StrictMode>
  ,
)
