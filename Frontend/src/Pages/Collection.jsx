import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from '../Components/ProductItem';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets/assets';

const Collection=() =>{

  const {products,currency}=useContext(ShopContext);
  const [showfilter,setShowFilter]=useState(false);
  const [filteredProduct,setFilteredProduct]=useState([]);
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState("relavent");

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=> item !==e.target.value))
    }

    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const togglesubCategory=(e)=>{
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev=>prev.filter(item=> item!==e.target.value))
      }else{
        setSubCategory(prev=>[...prev,e.target.value])
      }
  }

  const applyFilter=()=>{

    let copyProducts=products;

    if(category.length>0){
      copyProducts=copyProducts.filter(item =>category.includes(item.category))
    }

    if(subCategory.length>0){
      copyProducts=copyProducts.filter(item=>subCategory.includes(item.subCategory))
    }
    if(sortType== "low-high"){
      copyProducts.sort((a,b)=> a.price- b.price)
    }
    
    if(sortType==="high-low"){
      copyProducts.sort((a,b)=>b.price-a.price);
    }
    setFilteredProduct(copyProducts)
  }

  // useEffect(()=>(
  //   //  setFilteredProduct(products)
  //   applyFilter()
  // ),[]);

  
  useEffect(()=>{
    applyFilter()

  },[category,subCategory,products,sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Option */}
      <div className='min-w-60'>
        <p className='text-xl flex pr-4 items-center my-2 cursor-pointer' onClick={()=>setShowFilter(!showfilter)}>FILTERS 
          <img src={assets.dropdown_icon}  className={`h-4 sm:hidden ${showfilter?"rotate-90 ml-2" :""}`}   alt="" />
        </p>

        {/* Category Filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter?"" : "hidden"} sm:block`}>
          <p className='font-medium mb-3 text-sm'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={toggleCategory}value={"Men"} />Men
                
              </p>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={toggleCategory}value={"Women"} />Women
                
              </p>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={toggleCategory}value={"Kids"} />Kids
                
              </p>

            </div>

        </div>

        {/* Subcategory filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter?"" : "hidden"} sm:block`}>
          <p className='font-medium mb-3 text-sm'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={togglesubCategory} value={"Topwear"} />Topwear
                
              </p>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={togglesubCategory} value={"Bottomwear"} />Bottomwear
                
              </p>

              <p className='flex gap-2'>
                <input className="3"type="checkbox" onChange={togglesubCategory} value={"Winterwear"} />Winterwear
                
              </p>

            </div>

        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>

          {/* Product Sort */}

          <select onChange={(e)=>setSortType(e.target.value)}className='border-2 border-gray-300 text-sm px-2 '>
            <option value="relavent">Sort by: relavent</option>
            <option value="low-high">Sort by: Low To High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filteredProduct.map((items,index)=>(
              <ProductItem key={index} name={items.name} price={items.price} image={items.image} id={items._id}/>
            ))
          }
        </div>
      </div>
        
    </div>
  )
}

export default Collection