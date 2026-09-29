import React, { useState,useContext } from 'react';
import Title from '../Components/Title';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { paymentServices } from '../Services/paymentServices';
import { data } from 'react-router-dom';

export default function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const { navigate, delivery_fee } = useContext(ShopContext);
  const { token } = useContext(AuthContext);
  const { getCartAmount } = useContext(CartContext);


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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!token) {
      toast.error('Please log in before placing an order');
      navigate('/login');
      return;
    }

    try {
      if (paymentMethod !== 'chapa') {
        toast.info(`${paymentMethod} payment will be integrated later`);
        return;
      }
      const response = await paymentServices.createPayment(formData);
      // console.log(response)
      // const checkoutUrl = response.data.checkoutUrl;
            const checkoutUrl = response?.data?.checkoutUrl;

console.log("Checkout URL:", checkoutUrl);

if (!response?.data?.success || !checkoutUrl) {
    toast.error(
        response?.data?.message || "Unable to start Chapa payment"
    );
    return;
}

window.location.assign(checkoutUrl);
    } catch (error) {
      console.error('Chapa payment creation failed:', error.response?.data || error);
      toast.error(error.response?.data?.message || error.message || 'Unable to start payment');
    }
  };

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
              placeholder="Phone (e.g. 0912345678)"
              pattern="(?:\+?251|0)?[79][0-9]{8}"
              title="Enter an Ethiopian mobile number, for example 0912345678"
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
                <span className="font-medium text-gray-950">${getCartAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-500">Shipping Free</span>
                <span className="font-medium text-gray-950">${delivery_fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-gray-950">
                <span>Total</span>
                <span>${(getCartAmount() + delivery_fee).toFixed(2)}</span>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div
                onClick={() => setPaymentMethod('chapa')}
                className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5"
              >
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'chapa' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'chapa' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-green-700 font-bold text-sm tracking-tight">Chapa</span>
              </div>
              <div onClick={() => setPaymentMethod('stripe')} className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50">
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'stripe' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-blue-600 font-extrabold italic text-sm">Stripe</span>
              </div>
              <div onClick={() => setPaymentMethod('razorpay')} className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50">
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'razorpay' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-blue-900 font-bold text-sm">Razorpay</span>
              </div>
              <div onClick={() => setPaymentMethod('cod')} className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-50">
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Cash on delivery</span>
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