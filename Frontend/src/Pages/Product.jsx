
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ShopContext } from '../Context/ShopContext'
import { ProductContext } from '../Context/ProductContext'
import { CartContext } from '../Context/CartContext'

import { assets } from '../assets/frontend_assets/assets'
import RelatedProduct from '../Components/RelatedProduct'

function Product() {
  const { currency } = useContext(ShopContext)
  const { addToCart } = useContext(CartContext)
  const { products } = useContext(ProductContext)

  const { productId } = useParams()

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    if (!products || products.length === 0) {
      return
    }

    const product = products.find(
      (item) => item._id === productId
    )

    if (product) {
      setProductData(product)

      // Set first image as main image
      if (product.images && product.images.length > 0) {
        setImage(product.images[0]?.secure_url || '')
      }
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [products, productId])

  // Product not loaded yet
  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading product...
        </p>
      </div>
    )
  }

  return (
    <div className="border-t pt-10 transition-opacity duration-500 opacity-100">

      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}
      <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">

        {/* =====================================================
            PRODUCT IMAGES
        ===================================================== */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* =================================================
              THUMBNAILS
          ================================================= */}
          <div className="flex gap-3 overflow-x-auto sm:w-[90px] sm:flex-col sm:overflow-y-auto">

            {productData.images?.map((item, index) => {
              const imageUrl = item?.secure_url

              if (!imageUrl) {
                return null
              }

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setImage(imageUrl)}
                  className={`h-[80px] w-[80px] flex-shrink-0 overflow-hidden border bg-gray-50 transition sm:h-[85px] sm:w-[85px] ${
                    image === imageUrl
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`${productData.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              )
            })}

          </div>

          {/* =================================================
              MAIN IMAGE
          ================================================= */}
          <div className="w-full flex-1">

            <div className="w-full overflow-hidden bg-gray-50">

              {image ? (
                <img
                  src={image}
                  alt={productData.name}
                  className="block h-auto max-h-[650px] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-sm text-gray-400">
                  No image available
                </div>
              )}

            </div>

          </div>

        </div>

        {/* =====================================================
            PRODUCT INFORMATION
        ===================================================== */}
        <div className="flex-1">

          {/* Product name */}
          <h1 className="mt-2 text-2xl font-medium text-gray-900">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">

            <img
              src={assets.star_icon}
              className="w-3"
              alt="star"
            />

            <img
              src={assets.star_icon}
              className="w-3"
              alt="star"
            />

            <img
              src={assets.star_icon}
              className="w-3"
              alt="star"
            />

            <img
              src={assets.star_icon}
              className="w-3"
              alt="star"
            />

            <img
              src={assets.star_dull_icon}
              className="w-3"
              alt="star"
            />

            <p className="pl-2 text-sm text-gray-500">
              (122)
            </p>

          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium text-gray-900">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* =================================================
              SIZE
          ================================================= */}
          <div className="my-8 flex flex-col gap-4">

            <p className="text-sm font-medium">
              Select Size
            </p>

            <div className="flex flex-wrap gap-2">

              {productData.sizes?.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 text-sm transition ${
                    item === size
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* =================================================
              ADD TO CART
          ================================================= */}
          <button
            type="button"
            onClick={() => addToCart(productData._id, size)}
            className="bg-black px-8 py-3 text-sm text-white transition hover:bg-gray-800 active:bg-gray-700"
          >
            ADD TO CART
          </button>

          {/* Divider */}
          <hr className="my-3 w-3/4 text-gray-400" />

          {/* Product policies */}
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">

            <p>100% Original product.</p>

            <p>
              Cash on delivery is available on this product.
            </p>

            <p>
              Easy return and exchange policy within 7 days.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          DESCRIPTION & REVIEW
      ===================================================== */}
      <div className="mt-20">

        {/* Tabs */}
        <div className="flex">

          <p className="border border-gray-500 px-5 py-3 text-sm font-medium">
            Description
          </p>

          <p className="border border-gray-500 px-5 py-3 text-sm">
            Review (122)
          </p>

        </div>

        {/* Description */}
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm leading-6 text-gray-500">

          <p>
            An e-commerce website is an online platform that
            facilitates the buying and selling of products or
            services over the internet. It serves as a virtual
            marketplace where businesses and individuals can
            showcase their products, interact with customers,
            and conduct transactions without the need for a
            physical presence. E-commerce websites have gained
            immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>

          <p>
            E-commerce websites typically display products or
            services along with detailed descriptions, images,
            prices, and any available variations such as sizes
            and colors. Each product usually has its own
            dedicated page with relevant information.
          </p>

        </div>

      </div>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </div>
  )
}

export default Product



// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../Context/ShopContext';
// import { assets } from '../assets/frontend_assets/assets';
// import RelatedProduct from '../Components/RelatedProduct';
// import { ProductContext } from '../Context/ProductContext';
// import { CartContext } from '../Context/CartContext';

// function Product() {
  
//   const {currency}=useContext(ShopContext)
//   const {addToCart}=useContext(CartContext)

//     const {products}=useContext(ProductContext)

//   const {productId}=useParams();
//   const [productData,setProductData]=useState(false);
//   const [image,setImage]=useState("");
//   const [size,setSize]=useState("")


//   const fetchProductData= async()=>{


//     const product=products.find(
//       item=>item._id===productId
//     )

//     if(product){
//       setProductData(product);
//       setImage(product.images[0]?.secure_url);
//       return null
//     }

//     // products.map((item)=>{
//     //   if(item._id===productId){
//     //     setProductData(item)
//     //     setImage(item.images[0]?.secure_url)
//     //     return null
//     //   }
//     // })

//   }

//   useEffect(()=>{
//     // console.log(products,productId)
//    fetchProductData()
//   },[products,productId])
//   return productData?(
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

//       {/* Product Data */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/* product images */}

//         <div className=' flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal'> 
//              {
//               productData.images.map((item,index)=>(
//                 <img onClick={()=>setImage(item.secure_url)} src={item} alt="" key={index} className='w-full sm:w-[24%]  sm:mb-3 flex-shrink-0 cursor-pointer'/>
//               ))
//              }
//           </div>

//           <div className=' w-full sm:w-[80%]'>
//             <img className='w-full h-auto'src={image} alt="" />

//           </div>

//         </div>

//         {/* produat info */}

//         <div className='flex-1 '>
//           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//           <div className='flex items-center gap-1 mt-2'>
//             <img src={assets.star_icon} className='w-3 ' alt="" />
//             <img src={assets.star_icon} className='w-3 ' alt="" />
//             <img src={assets.star_icon} className='w-3 ' alt="" />
//             <img src={assets.star_icon} className='w-3 ' alt="" />
//             <img src={assets.star_dull_icon} className='w-3 ' alt="" />
//             <p className='pl-2'>(122)</p>

//           </div>

//           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

//           <div className='flex flex-col gap-4 my-8'>
//             <p>Select Size</p>
//             <div className='flex gap-2'>
//               {
//                 productData.sizes.map((item,index)=>
//                   <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500':""}`}key={index}>{item}</button>

//                 )
//               }

//             </div>
//           </div>
//           <button onClick={()=>addToCart(productData._id,size)}className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
//           <hr className='my-3 text-gray-400 w-3/4'/>

//           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>


//       </div>

//       {/* --------Description & Review Section--------- */}

//       <div className='mt-20'>
//         <div className='flex'>
//           <p className='border border-gray-500 px-5 py-3 text-sm'>Description</p>
//           <p className='border border-gray-500 px-5 py-3 text-sm'>Review (122)</p>

//         </div>

//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual
//              marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
//           </p>

//           <p>
//             E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
//           </p>

//         </div>

//       </div>

//       {/* --------Display Related Product-------- */}

//       <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>

//     </div>
//   ):
//   <div className='opacity-0'>

//   </div>
// }

// export default Product