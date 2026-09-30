import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';

function ListProduct() {

  const [list,setList]=useState([]);
  

  const removeItems=async(id)=>{
    try {
      // console.log(id)
      const response=await axios.post(backendUrl + "/api/product/remove",{id});
      if(response.data.success){
        toast.success(response.data.message);
        fetchList()
      }else{
        toast.error(response.data.message)

      }

    } catch (error) {
      console.log(error.response.data);
      toast.error(error.message)
    }
  }
  

  const fetchList=async()=>{
    
    try {
      const response=await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data)
      
      if(response.data.success){
        
        setList(response.data.products);
        // toast.success(response.data.message)
      // console.log(list)
      // console.log(response.data);
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <>

      <p className='mb-2'>All Products List </p>
      <div className='flex flex-col gap-2'>
        {/* ----List Table Title---- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b  className='text-center'>Action</b>


        </div>

        {/* -----List Product----- */}

        {
          list.map((item,index)=>(

            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img  className='w-12'src={item.images[0]?.secure_url} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeItems(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
 
            </div>

          ))
        }
      </div>
    </>
  )
}

export default ListProduct