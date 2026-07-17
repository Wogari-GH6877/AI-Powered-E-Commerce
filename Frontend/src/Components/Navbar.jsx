import React from 'react'
import {assets} from "../assets/assets.js"
import { Link, NavLink } from 'react-router-dom'
function Navbar() {

    const links=[
        {name:"HOME",path:"/"},
        {name:"COLLECTION",path:"/collection"},
        {name:"ABOUT",path:"/about"},
        {name:"CONTACT",path:"/contact"}

    ]
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img src={assets.logo} alt="Company logo" className='w-30'/>

        <ul className='hidden sm:flex gap-5 text-sm '>

        {
            links.map((items)=>(

                <NavLink
                to={items.path}
                key={items.path}
                >
                {({ isActive }) => (
                    <div className="flex flex-col items-center gap-1">
                    <p className={isActive ? "text-black" : "text-gray-700"}>
                        {items.name}
                    </p>

                    <hr
                        className={`w-1/2 border-none h-[1.5px] bg-gray-700 ${
                        isActive ? "block" : "hidden"
                        }`}
                    />
                    </div>
                )}
                </NavLink>
                
            ))
        }
        </ul>
  
     <div className='flex items-center gap-5'>
        <img src={assets.info_icon} alt="Sreach Icon "  className=' w-5 cursor-pointer'/>

        <div className='group relative bg-red-500'>
            <img src={assets.chats_icon} alt="Profile icon" className='w-5 cursor-pointer' />
            
            <div className="absolute hidden right-0 group-hover:block   w-30 bg-white-600 pt-4 dropdown-menu">
                <div className='flex flex-col bg-slate-100 text-gray-500 rounded w-36 gap-3 px-5 py-2'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Order</p>
                    <p className='cursor-pointer hover:text-black'>Log Out</p>
                </div>
                
            </div>
        </div>

        <Link to="/cart" className='relative '>
        <img src={assets.dropdown_icon} alt="" className='w-5 min-w-5'/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
     </div>
        
    </div>
  )
}

export default Navbar