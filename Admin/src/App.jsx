import React, { useEffect } from 'react'
import Navbar from './Component/Navbar'
import SideBar from './Component/SideBar'
import { Routes ,Route} from 'react-router-dom'
import AddProduct from './Pages/AddProduct'
import ListProduct from './Pages/ListProduct'
import Orders from './Pages/Orders'
import { useState } from 'react'
import Login from './Component/Login'
 import { ToastContainer, toast } from 'react-toastify';


export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency="$"

function App() {

  const [token,setToken]=useState(   localStorage.getItem('token')?   localStorage.getItem('token'):""

);

  useEffect(()=>{
   localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      {token === "" ? <Login setToken={setToken}/>: 
      
      <>
      <ToastContainer/>
      <Navbar setToken={setToken}/>
      <hr />

      <div className='flex w-full '>
        <SideBar/>

        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>

          <Routes>
            <Route path='/add' element={<AddProduct token={token}/>}/>
            <Route path="/list" element={<ListProduct token={token}/>}/>
            <Route path='/order' element={<Orders token={token}/>}/>
          </Routes>

        </div>

      </div></>}
    
    </div>


  )
}

export default App