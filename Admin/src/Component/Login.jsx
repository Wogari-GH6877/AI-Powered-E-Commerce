import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App';

function Login({setToken}) {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
  
    const onSubmitHandler=async(e)=>{
        try {
            e.preventDefault()
                   
            console.log(backendUrl)

            
       const response= await axios.post(backendUrl + "/api/user/login",{email,password});
       const token=response.data.token;
       setToken(token)
       console.log(token)
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 '>Admin Panel</h1>

            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@gmail.com' required/>
                </div>  

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>PassWord</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
                </div>

                <button className="w-full mt-2 py-2 px-4 rounded-md text-white bg-black" type='submit' >Login</button>


            </form>
        </div>
    </div>
  )
}

export default Login