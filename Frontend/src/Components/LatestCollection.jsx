import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
function LatestCollection() {

    const {products,currency}=useContext(ShopContext)
    const [LatestProduct,setLatestProduct]=useState([]);
    const [BestSeller,setBestSeller]=useState([])

    useEffect(()=>{
      setLatestProduct(products.slice(0,10))
    },[])
  return (
    <div className='my-10 '>
      <div className='text-3xl text-center py-8'>
          <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
          <p className='sm:text-sm text-gray-500 w-3/4 m-auto text-xs md:text-base mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, officia ut mollitia delectus enim animi, fugit repellendus in, nulla !</p>
      </div>
       

       {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          LatestProduct.map((items,index)=>(
            <ProductItem key={index} id={items._id} name={items.name} price={items.price} image={items.image} />
          ))
        }
      </div>
      
    </div>
  )
}

export default LatestCollection