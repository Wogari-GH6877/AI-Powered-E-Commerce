import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

 import { ToastContainer, toast } from 'react-toastify';
// import { ShopContext } from './Context/ShopContext.jsx';
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
import Order from "./Pages/Order.jsx";
import Collection from "./Pages/Collection.jsx";
import Login from "./Pages/Login.jsx";
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Product from "./Pages/Product.jsx";
import About from "./Pages/About.jsx";
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { AuthContext } from './Context/AuthContext.jsx';
import PaymentCallback from "./Pages/PaymentCallback.jsx";
import AIAssistant from './Components/AIAssistant.jsx';
function App() {

  const {token,setToken}=useContext(AuthContext)
  return (

    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
         <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/order" element={<Order />} />
        <Route path="/collection" element={<Collection />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={token? <PlaceOrder />:<Navigate to="/login"/>} />
        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route path="/product/:productId" element={<Product />} />
        
        <Route path="/about" element={<About />} /> 
      
      </Routes>,
      <AIAssistant/>
      <Footer/>
    </div>
      

  )
}

export default App