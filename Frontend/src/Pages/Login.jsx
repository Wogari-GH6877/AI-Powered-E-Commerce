import React, { useContext, useEffect, useState } from 'react';
import NewsLetterBox from '../Components/NewsLetterBox';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import axios from "axios"
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  // State handles switching between 'Sign Up' and 'Login' view panels
  const [currentState, setCurrentState] = useState('Login');
  const [name,setName]=useState("")
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  
  const navigate=useNavigate()

  // const {token,setToken,backendUrl,navigate}=useContext(ShopContext);

  const {token,
            setToken,
            login,
            register,
            logout}=useContext(AuthContext)

  

    const onSubmitHandler=async(e)=>{


      try {
        e.preventDefault();
         

        if(currentState==="Sign Up"){
          
           const response=await register(name,email,password);

           if(response.data.success){
            toast.success(response.data.message)
            navigate("/")

           }else{
            toast.error(response.data.message)
           }
        }else{
           const response = await login(email, password);

           if(response.data.success){
            toast.success(response.data.message)
            navigate("/")

           }else{
            toast.error(response.data.message)
           }
        }

        
      } catch (error) {
        // console.log(error.response?.data?.message)
        toast.error(error.response?.data?.message)
      }
    }

    // useEffect(()=>{
    //   if(token){
    //     navigate("/")
    //   }
    // },[token])

  return (
    <div  className="min-h-screen bg-white font-sans text-gray-800 flex flex-col justify-between">
      
      {/* --- MAIN AUTH CARD SECTION --- */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] mx-auto text-center">
          
          {/* Header Section with the unique line accent */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-3xl prata-regular text-gray-700 tracking-wide">
              {currentState}
            </h2>
            <div className="h-[1.5px] w-8 bg-gray-600 mt-2"></div>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            
            {/* Name Input Field: Rendered strictly on 'Sign Up' state */}
            {currentState === 'Sign Up' && (
              <input onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full px-3 py-2.5 border border-gray-400 text-sm placeholder-gray-400 font-light outline-none transition focus:border-gray-900"
              />
            )}

            {/* Email Input Field */}
            <input
            onChange={(e)=>setEmail(e.target.value)}
                value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2.5 border border-gray-400 text-sm placeholder-gray-400 font-light outline-none transition focus:border-gray-900"
            />

            {/* Password Input Field */}
            <input
              onChange={(e)=>setPassword(e.target.value)}
                value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2.5 border border-gray-400 text-sm placeholder-gray-400 font-light outline-none transition focus:border-gray-900"
            />

            {/* Context Sub-links Panel: Rendered strictly on 'Login' state */}
            {currentState === 'Login' && (
              <div className="flex justify-between items-center text-xs text-gray-500 font-light px-0.5 pt-1">
                <span className="cursor-pointer hover:text-gray-900 transition-colors">
                  Forgot your password?
                </span>
                <span 
                  onClick={() => setCurrentState('Sign Up')}
                  className="cursor-pointer hover:text-gray-900 transition-colors"
                >
                  Create account
                </span>
              </div>
            )}

            {/* Submit Action Button Block */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#1c1c1c] text-white text-xs tracking-wider px-10 py-3 font-light hover:bg-black transition-colors"
              >
                {currentState === 'Sign Up' ? 'Create' : 'Sign in'}
              </button>
            </div>

            {/* Extra Toggle Panel helper visible when in 'Sign Up' state */}
            {currentState === 'Sign Up' && (
              <p className="text-xs text-gray-400 font-light pt-2">
                Already have an account?{' '}
                <span 
                  onClick={() => setCurrentState('Login')}
                  className="text-gray-600 underline cursor-pointer hover:text-gray-900"
                >
                  Login here
                </span>
              </p>
            )}

          </form>
        </div>
      </div>

      {/* --- BOTTOM PROMO BANNER & NEWSLETTER SUBSCRIPTION --- */}

      <NewsLetterBox/>
      

    </div>
  );
}