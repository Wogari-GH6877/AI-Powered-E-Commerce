import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';
import Title from '../Components/Title';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col justify-between">
      
      {/* --- MAIN CONTACT CONTENT --- */}
      <div className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        
        {/* Main Section Header with Line Accent */}

        <div className='text-2xl'>
          <Title text1={"CONTACT"} text2={"US"}/>
        </div>
        

        {/* Layout Container split into Image and Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center max-w-4xl mx-auto">
          
          {/* Left Side: Workspace Image */}
          <div className="w-full">
            <img 
              src={assets.contact_img}
              alt="Laptop desk setup" 
              className="w-full h-auto object-cover rounded shadow-sm"
            />
          </div>

          {/* Right Side: Contact Details */}
          <div className="space-y-6 text-sm">
            
            {/* Store Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-base tracking-wide text-gray-700 uppercase">
                Our Store
              </h3>
              <div className="text-gray-500 font-light space-y-1 leading-relaxed">
                <p>54709 Willms Station</p>
                <p>Suite 350, Washington, USA</p>
              </div>
              <div className="text-gray-500 font-light space-y-1 pt-2">
                <p>Tel: (415) 555-0132</p>
                <p>Email: greatstackdev@gmail.com</p>
              </div>
            </div>

            {/* Careers Section */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-base tracking-wide text-gray-700 uppercase">
                Careers at Forever
              </h3>
              <p className="text-gray-500 font-light">
                Learn more about our teams and job openings.
              </p>
              
              <button 
                className="px-6 py-3 border border-gray-900 text-xs font-light tracking-wide text-gray-900 hover:bg-black hover:text-white transition-all duration-200"
                onClick={() => console.log('Redirecting to careers...')}
              >
                Explore Jobs
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- BOTTOM PROMO BANNER & NEWSLETTER SUBSCRIPTION --- */}
      <NewsLetterBox/>

    </div>
  );
}