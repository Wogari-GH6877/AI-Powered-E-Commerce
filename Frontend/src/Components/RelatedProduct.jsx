import React, { useEffect, useState,useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function RelatedProduct({category,subCategory}) {

    const {products}=useContext(ShopContext);
    const [related,setRelated]=useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productCopy=products.slice()

            productCopy=productCopy.filter((item)=> category === item.category)
            productCopy=productCopy.filter((item)=> subCategory === item.subCategory)
            setRelated(productCopy.slice(0,5))
        }
    },[products])
  return (
    <div className='my-8'>
        <div className='text-3xl text-center'>
            <Title text1={"RELATED "} text2={"PRODUCTS"}/>
            <p className='sm:text-sm text-gray-500 w-3/4 m-auto text-xs md:text-base mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestiae optio ipsam quaerat dolor quibusdam a officiis.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-6' >
                {
                    related.map((items,index)=>(
                        <ProductItem key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
                    ))
                }
            </div>
    </div>
  )
}

export default RelatedProduct