// import React, { useState } from 'react'
// import {assets} from "../assets/assets.js"
// import { Link, NavLink } from 'react-router-dom'
// function Navbar() {
     
//     const [showMenu,setShowMenu]=useState(false)
//     const links=[
//         {name:"HOME",path:"/"},
//         {name:"COLLECTION",path:"/collection"},
//         {name:"ABOUT",path:"/about"},
//         {name:"CONTACT",path:"/contact"}

//     ]
//   return (
//     <div className='flex items-center justify-between py-5 font-medium'>
//         <img src={assets.logo} alt="Company logo" className='w-30'/>

//         <ul className='hidden sm:flex gap-5 text-sm '>

//         {
//             links.map((items)=>(

//                 <NavLink
//                 to={items.path}
//                 key={items.path}
//                 >
//                 {({ isActive }) => (
//                     <div className="flex flex-col items-center gap-1">
//                     <p className={isActive ? "text-black" : "text-gray-700"}>
//                         {items.name}
//                     </p>

//                     <hr
//                         className={`w-1/2 border-none h-[1.5px] bg-gray-700 ${
//                         isActive ? "block" : "hidden"
//                         }`}
//                     />
//                     </div>
//                 )}
//                 </NavLink>
                
//             ))
//         }
//         </ul>

        
        
        

        
  
//      <div className='flex items-center gap-5  '>
//         <img src={assets.info_icon} alt="Search Icon "  className=' w-5 cursor-pointer'/>

//         <div className='group relative bg-red-500'>
//             <img src={assets.chats_icon} alt="Profile icon" className='w-5 cursor-pointer' />
            
//             <div className="absolute hidden right-0 group-hover:block   w-30 bg-white-600 pt-4 dropdown-menu">
//                 <div className='flex flex-col bg-slate-100 text-gray-500 rounded w-36 gap-3 px-5 py-2'>
//                     <p className='cursor-pointer hover:text-black'>My Profile</p>
//                     <p className='cursor-pointer hover:text-black'>Order</p>
//                     <p className='cursor-pointer hover:text-black'>Log Out</p>
//                 </div>
                
//             </div>
//         </div>

//         <Link to="/cart" className='relative '>
//         <img src={assets.dropdown_icon} alt="" className='w-5 min-w-5'/>
//         <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
//         </Link>

//         <img src={assets.menu_icon} alt="menu icon" className='sm:hidden w-6 cursor-pointer' onClick={()=>setShowMenu(true)} />
//      </div>

     
    
//         {/* side bar for small screen */}

//         <div className={`absolute top-0 right-0 overflow-hidden bg-white-500 transition-all ${showMenu? 'w-full ':'w-0'}`}>
//             <div className='flex  flex-col text-gray-600'>
//                 <div onClick={()=>setShowMenu(false)}className='flex items-center gap-4 p-3 cursor-pointer'>
//                     <img src={assets.dropdown_icon} alt=""  className='h-4 rotate-90'/>
//                     <p>Back</p>
//                 </div>


//                 {
//             links.map((items)=>(

//                 <NavLink
//                 to={items.path}
//                 key={items.path}
//                 className='py-2 pl-6 border'
//                 >
//                 {({ isActive }) => (
//                     <div className="flex flex-col items-center gap-1">
//                     <p className={isActive ? "text-black" : "text-gray-700"}>
//                         {items.name}
//                     </p>

//                     <hr
//                         className={`w-1/2 border-none h-[1.5px] bg-gray-700 ${
//                         isActive ? "block" : "hidden"
//                         }`}
//                     />
//                     </div>
//                 )}
//                 </NavLink>
                
//             ))
//         }

//             </div>

//         </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "COLLECTION", path: "/collection" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Company Logo"
          className="w-30 cursor-pointer"
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center gap-6 text-sm">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path}>
            {({ isActive }) => (
              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <p
                  className={`transition-colors ${
                    isActive ? "text-black" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </p>

                <hr
                  className={`w-1/2 h-[2px] border-none bg-black transition-all ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <img
          src={assets.info_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            src={assets.chats_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
          />

          <div className="absolute right-0 hidden pt-4 group-hover:block">
            <div className="flex flex-col w-36 gap-3 rounded bg-slate-100 px-5 py-3 text-gray-600 shadow-lg">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.dropdown_icon}
            alt="Cart"
            className="w-5 min-w-5"
          />

          <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[8px] text-white">
            10
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="w-6 cursor-pointer sm:hidden"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full overflow-hidden bg-white transition-all duration-300 ${
          showMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          {/* Back Button */}
          <button
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-4 p-4"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <span>Back</span>
          </button>

          {/* Mobile Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `border-b px-6 py-3 ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;