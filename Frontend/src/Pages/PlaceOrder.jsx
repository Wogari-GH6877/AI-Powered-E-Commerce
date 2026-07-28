import React, { useState,useContext } from 'react';
import Title from '../Components/Title';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext);
  const [formData,setFormData]=useState({

    firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
  });

  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value

    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler=async(event)=>{

    event.preventDefault();
    try {
      let orderItems=[]

      for (const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=> product._id===items))
            if(itemInfo){
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }

          }
        }

      }

      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
      switch(paymentMethod){

        case 'cod':
            const response=axios.post(backendUrl + "/api/order/place",orderData,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
        
  console.log(response)
        if( response.data.success){
          setCartItems({})
          navigate("/order")
        }else{
          toast.error(
            response.data.message
          )
        }

          break;
         default:
           break;
    }

    }catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message || error.message
  );
}

  }

  return (
    <form  onSubmit={onSubmitHandler}className="max-w-6xl mx-auto p-6 font-sans text-gray-800 min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* --- LEFT SIDE: DELIVERY INFORMATION --- */}
        <div className="space-y-6">
          <div className='text-2xl'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
              required
                onChange={onChangeHandler} name="firstName" value={formData.firstName}
                type="text"
                placeholder="First name"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
              <input 
              required
                type="text"
                onChange={onChangeHandler} name="lastName" value={formData.lastName}
                placeholder="Last name"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
            </div>

            <input 
            required
              onChange={onChangeHandler} name="email" value={formData.email}
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
            />

            <input 
            required

            onChange={onChangeHandler} name="street" value={formData.street}
              type="text"
              placeholder="Street"
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
            />

            <div className="grid grid-cols-2 gap-4">
              <input 
              required
              onChange={onChangeHandler} name="city" value={formData.city}
                type="text"
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
              <input 
              required
              onChange={onChangeHandler} name="state" value={formData.state}
                type="text"
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input 
              required
              onChange={onChangeHandler} name="zipCode" value={formData.zipCode}
                type="text"
                placeholder="Zip code"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
              <input 
              required
              onChange={onChangeHandler} name="country" value={formData.country}
                type="text"
                placeholder="Country"
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
              />
            </div>

            <input
            required
            onChange={onChangeHandler} name="phone" value={formData.phone}
              type="tel"
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm placeholder-gray-400 outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* --- RIGHT SIDE: TOTALS & PAYMENT --- */}
        <div>
          {/* Cart Totals */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTALS"}/>
          </div>
              
            </div>

            <div className="text-sm divide-y divide-gray-100 border-b border-gray-100 mb-6">
              <div className="flex justify-between py-2.5">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-950">$60.00</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-500">Shipping Free</span>
                <span className="font-medium text-gray-950">$10</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-gray-950">
                <span>Total</span>
                <span>$70.00</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <div className="flex items-center gap-2 mb-6">

              <div className='text-1xl'>
            <Title text1={"PAYMENT"} text2={"METHOD"}/>
          </div>
              
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {/* Stripe option */}
              <div
                onClick={() => setPaymentMethod('stripe')}
                className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'stripe' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-blue-600 font-extrabold italic text-sm tracking-tight">stripe</span>
              </div>

              {/* Razorpay option */}
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'razorpay' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <div className="flex items-center text-xs font-black tracking-tighter text-blue-900 italic">
                  <span className="text-cyan-500 text-sm not-italic mr-0.5">▲</span>Razorpay
                </div>
              </div>

              {/* Cash On Delivery option */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  CASH ON DELIVERY
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3.5 font-semibold hover:bg-gray-900 transition-colors duration-200"
              >
                PLACE ORDER
              </button>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}