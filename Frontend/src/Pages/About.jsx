import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../Components/Title';
import NewsLetterBox from '../Components/NewsLetterBox';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans bg-white text-gray-800">
      
      {/* --- ABOUT US TOP SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-20">
        
        {/* Left Side: Styled Flat-lay Apparel Image */}
        <div className="w-full">
          <img 
          src={assets.about_img}
            alt="About Forever apparel setup" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side: Description Narrative Layout */}
        <div className="text-gray-500 text-sm leading-relaxed space-y-6 pt-2">
          {/* Main Section Header with Line Accent */}
          
          <div className='text-2xl'>
            <Title text1={"ABOUT"} text2={"US"}/>

          </div>

          <p>
            Forever Was Born Out Of A Passion For Innovation And A Desire To Revolutionize The Way 
            People Shop Online. Our Journey Began With A Simple Idea: To Provide A Platform Where 
            Customers Can Easily Discover, Explore, And Purchase A Wide Range Of Products From 
            The Comfort Of Their Homes.
          </p>
          
          <p>
            Since Our Inception, We've Worked Tirelessly To Curate A Diverse Selection Of High-
            Quality Products That Cater To Every Taste And Preference. From Fashion And Beauty To 
            Electronics And Home Essentials, We Offer An Extensive Collection Sourced From Trusted 
            Brands And Suppliers.
          </p>

          <h3 className=" text-gray-700 text-base pt-2">Our Mission</h3>
          
          
          <p>
            Our Mission At Forever Is To Empower Customers With Choice, Convenience, And 
            Confidence. We're Dedicated To Providing A Seamless Shopping Experience That Exceeds 
            Expectations, From Browsing And Ordering To Delivery And Beyond.
          </p>
        </div>
      </div>

      {/* --- WHY CHOOSE US BOTTOM SECTION --- */}
      <div className="space-y-6 mb-10">
        {/* Section Title Header with Line Accent */}

        <div className='text-2xl'>
            <Title text1={"WHY"} text2={"CHOOSE US"}/>

          </div>
        

        {/* Bordered Features Columns Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 text-xs">
          
          {/* Column 1: Quality Assurance */}
          <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-gray-200 space-y-4">
            <h4 className="font-medium text-gray-900 uppercase tracking-wider">
              QUALITY ASSURANCE:
            </h4>
            <p className="text-gray-500 leading-relaxed font-light text-[13px]">
              We Meticulously Select And Vet Each Product To Ensure It Meets Our 
              Stringent Quality Standards.
            </p>
          </div>

          {/* Column 2: Convenience */}
          <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-gray-200 space-y-4">
            <h4 className="font-medium text-gray-900 uppercase tracking-wider">
              CONVENIENCE:
            </h4>
            <p className="text-gray-500 leading-relaxed font-light text-[13px]">
              With Our User-Friendly Interface And Hassle-Free Ordering Process, Shopping 
              Has Never Been Easier.
            </p>
          </div>

          {/* Column 3: Customer Service */}
          <div className="p-10 md:p-14 space-y-4">
            <h4 className="font-medium text-gray-900 uppercase tracking-wider">
              EXCEPTIONAL CUSTOMER SERVICE:
            </h4>
            <p className="text-gray-500 leading-relaxed font-light text-[13px]">
              Our Team Of Dedicated Professionals Is Here To Assist You The Way, Ensuring Your 
              Satisfaction Is Our Top Priority.
            </p>
          </div>

        </div>
      </div>
      <NewsLetterBox />

    </div>
  );
}