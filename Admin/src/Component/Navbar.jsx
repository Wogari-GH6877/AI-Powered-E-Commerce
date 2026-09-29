import React from 'react'
import { assets } from '../assets/admin_assets/assets'

function Navbar({setToken}) {

  const Logout=async()=>{

    try {
      setToken(localStorage.removeItem("token"))
      setToken("")
      
    } catch (error) {
      return res.json({success:false,message:error.message})
    }

  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className="w-[max(10%,80px)]"src={assets.logo} alt="" />

        <button onClick={()=>{Logout()}} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>Logout</button>

    </div>
  )
}

export default Navbar