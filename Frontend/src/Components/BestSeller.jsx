import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
function BestSeller() {

    const [BestSeller,setBestSeller]=useState([])
    const{currency,products}=useContext(ShopContext)

    useEffect(()=>{
      setBestSeller(products.filter(items=> items.bestseller===true).slice(0,5))
        
    },[])
    
  return (
    <div className='my-8'>
        <div className='text-3xl text-center'>
            <Title text1={"BEST"} text2={"SELLER"}/>
            <p className='sm:text-sm text-gray-500 w-3/4 m-auto text-xs md:text-base mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestiae optio ipsam quaerat dolor quibusdam a officiis.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-6' >
                {
                    BestSeller.map((items,index)=>(
                        <ProductItem key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
                    ))
                }
            </div>
        
    </div>
  )
}

export default BestSeller