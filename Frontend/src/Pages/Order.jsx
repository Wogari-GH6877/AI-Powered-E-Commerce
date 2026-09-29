import React, { useContext, useEffect, useState } from 'react';
import Title from '../Components/Title';
import { ShopContext } from '../Context/ShopContext';
import { AuthContext } from '../Context/AuthContext';
import { orderServices } from '../Services/orderServices';

export default function Order() {

  const {currency}=useContext(ShopContext);
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('Loading your orders...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setMessage('Please log in to view your orders.');
      setLoading(false);
      return;
    }
    setLoading(true);
    orderServices.getUserOrders(token)
      .then(({ data }) => {
        if (data.success) {
          setOrders(data.orders || []);
          setMessage('You have not placed any orders yet.');
        } else setMessage(data.message || 'Unable to load orders.');
      })
      .catch((error) => setMessage(error.response?.data?.message || 'Unable to load orders.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800 bg-white">
      
      {/* Page Heading */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>

      </div>

      {/* Orders List Container */}
      <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
        {loading || orders.length === 0 ? <p className="py-10 text-center text-gray-500">{loading ? 'Loading your orders...' : message}</p> : orders.map((order) => {
          const items = Array.isArray(order.items) ? order.items : [];
          return (
          <div 
            key={order._id} 
            className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm"
          >
            {/* Left Section: Image and Product Details */}
            <div className="flex items-start gap-4 flex-1">
              <div className="flex gap-2">
                {items.map((item, itemIndex) => {
                  const image = item.image && item.image !== 'product-image-unavailable'
                    ? item.image
                    : item.productId?.images?.[0]?.secure_url;
                  return image && <img key={`${order._id}-${itemIndex}`} src={image} alt={item.name} className="w-20 h-24 object-cover bg-gray-50 rounded" />;
                })}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[15px] font-medium text-gray-900">{items.map((item) => item.name).join(', ') || 'Order items'}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600">
                  <span className="font-medium">{currency}{order.amount}</span>
                  <span>Items: {items.reduce((total, item) => total + item.quantity, 0)}</span>
                  <span>Payment: {order.paymentStatus}</span>
                </div>
                <p className="text-gray-400 text-xs pt-1">
                  Date: <span className="text-gray-500">{new Date(order.createdAt || order.date).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            {/* Middle Section: Status Indicator */}
            <div className="flex items-center gap-2 md:w-48">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
              <span className="text-gray-600 md:text-base text-sm">{order.orderStatus}</span>
            </div>

            {/* Right Section: Action Button */}
            <div className="flex items-center">
              <button 
                className="px-6 py-2 border border-gray-200 text-xs font-medium text-gray-700 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Track Order
              </button>
            </div>

          </div>
          );
        })}
      </div>

    </div>
  );
}