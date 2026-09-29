


import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { AuthContext } from "../Context/AuthContext";
import { ShopContext } from "../Context/ShopContext";
import { CartContext } from "../Context/CartContext";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "COLLECTION", path: "/collection" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken}=useContext(AuthContext)
  // const {showSearch,setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);
    const {showSearch,setShowSearch,navigate}=useContext(ShopContext);
    const {getCartCount,setCartItems}=useContext(CartContext)


  
  const Logout=async()=>{

    try {
            navigate("/login");

      setToken(localStorage.removeItem("token"))
      setToken("");
      setCartItems({})
      
      
    } catch (error) {
      return res.json({success:false,message:error.message})
    }

  }

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Company Logo"
          className="w-40 cursor-pointer"
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
        <img onClick={()=>setShowSearch(true)}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          {!token?<Link to="/login"> <img
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
            
          /></Link>:<img
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
            
          />}
         

          {!token ? "":<><div className="absolute right-0 hidden pt-4 group-hover:block">
            <div className="flex flex-col w-36 gap-3 rounded bg-slate-100 px-5 py-3 text-gray-600 shadow-lg">
              <p onClick={()=>navigate("/profile")} className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate("/order")} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={()=>Logout()}className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div></>}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="w-5 min-w-5"
          />

          <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[8px] text-white">
            {getCartCount()}
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
                    ? "bg-black text-white"
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