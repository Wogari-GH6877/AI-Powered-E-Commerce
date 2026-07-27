import React, { useContext } from 'react';
import Title from '../Components/Title';
import { ShopContext } from '../Context/ShopContext';
// Sample order data based on the provided UI design
const orderItems = [
  {
    id: 1,
    name: "Men Round Neck Pure Cotton T-shirt",
    price: 149,
    quantity: 1,
    size: "L",
    date: "25, May, 2024",
    status: "Ready to ship",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Men Round Neck Pure Cotton T-shirt",
    price: 149,
    quantity: 1,
    size: "L",
    date: "25, May, 2024",
    status: "Shipped",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export default function Order() {

  const {currency,products}=useContext(ShopContext)
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800 bg-white">
      
      {/* Page Heading */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>

      </div>

      {/* Orders List Container */}
      <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
        {products.slice(1,4).map((order,index) => (
          <div 
            key={index} 
            className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm"
          >
            {/* Left Section: Image and Product Details */}
            <div className="flex items-start gap-4 flex-1">
              <img 
                src={order.image[0]} 
                alt={order.name} 
                className="w-20 h-24 object-cover bg-gray-50 rounded"
              />
              <div className="space-y-1.5">
                <h3 className="text-[15px] font-medium text-gray-900">{order.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600">
                  <span className="font-medium">{currency}{order.price}</span>
                  <span>Quantity: {order.quantity}</span>
                  <span>Size: {order.size}</span>
                </div>
                <p className="text-gray-400 text-xs pt-1">
                  Date: <span className="text-gray-500">{order.date}</span>
                </p>
              </div>
            </div>

            {/* Middle Section: Status Indicator */}
            <div className="flex items-center gap-2 md:w-48">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
              <span className="text-gray-600 md:text-base text-sm">onshipping</span>
            </div>

            {/* Right Section: Action Button */}
            <div className="flex items-center">
              <button 
                className="px-6 py-2 border border-gray-200 text-xs font-medium text-gray-700 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150"
                onClick={() => console.log(`Tracking order #${order.id}`)}
              >
                Track Order
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}