
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl">

          {/* ================= LEFT SIDE ================= */}
          <div className="w-full sm:w-1/2 bg-[#fafafa] flex items-center">
            <div className="px-8 py-12 sm:px-10 md:px-14 lg:px-20">

              {/* Small Heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 md:w-12 h-[1px] bg-[#222]" />

                <p className="text-[11px] md:text-xs font-semibold tracking-wide text-[#222]">
                  OUR BESTSELLERS
                </p>
              </div>

              {/* Main Heading */}
              <h1 className="prata-regular text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[#202020]">
                New Arrivals

                <span className="block font-sans font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 tracking-[-2px]">
                  Just For You
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-7 max-w-md mt-6 mb-8">
                Discover the latest trends and timeless pieces
                carefully curated just for you.
              </p>

              {/* CTA */}
              <a
                href="/collection"
                className="inline-flex items-center gap-7 bg-black text-white
                px-6 py-4 text-[11px] font-semibold uppercase
                tracking-wide hover:bg-[#333] transition-all duration-300"
              >
                Shop Now

                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                />
              </a>

              {/* Slider Dots */}
              <div className="flex items-center gap-2 mt-9">
                <span className="w-2.5 h-2.5 rounded-full bg-black" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full sm:w-1/2">
            <img
              src={assets.hero_img}
              alt="Latest fashion collection"
              className="w-full h-full object-contain object-center"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero



// import React from 'react'
// import { ArrowRight } from 'lucide-react'
// import { assets } from '../assets/frontend_assets/assets'

// const Hero = () => {
//   return (
//     <section className="px-4 sm:px-6 lg:px-8">
//       <div className="max-w-[1440px] mx-auto">

//         <div className="flex flex-col sm:flex-row min-h-[500px] lg:min-h-[570px] overflow-hidden rounded-2xl">

//           {/* ================= LEFT SIDE ================= */}
//           <div className="w-full sm:w-1/2 bg-[#fafafa] flex items-center">

//             <div className="px-8 py-14 sm:px-10 md:px-14 lg:px-20">

//               {/* Small Heading */}
//               <div className="flex items-center gap-3 mb-6">

//                 <span className="w-9 md:w-12 h-[1px] bg-[#222]"></span>

//                 <p className="text-[11px] md:text-xs font-semibold tracking-wide text-[#222]">
//                   OUR BESTSELLERS
//                 </p>

//               </div>

//               {/* Main Heading */}
//               <h1 className="prata-regular text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[#202020]">

//                 New Arrivals

//                 <span className="block font-sans font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 tracking-[-2px]">
//                   Just For You
//                 </span>

//               </h1>

//               {/* Description */}
//               <p className="text-gray-500 text-sm leading-7 max-w-md mt-6 mb-8">
//                 Discover the latest trends and timeless pieces
//                 carefully curated just for you.
//               </p>

//               {/* CTA */}
//               <a
//                 href="collection"
//                 className="inline-flex items-center gap-7 bg-black text-white
//                 px-6 py-4 text-[11px] font-semibold uppercase
//                 tracking-wide hover:bg-[#333] transition-all duration-300"
//               >
//                 Shop Now

//                 <ArrowRight
//                   size={17}
//                   strokeWidth={1.5}
//                 />
//               </a>

//               {/* Slider Dots */}
//               <div className="flex items-center gap-2 mt-9">

//                 <span className="w-2.5 h-2.5 rounded-full bg-black"></span>

//                 <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>

//                 <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>

//               </div>

//             </div>

//           </div>


//           {/* ================= RIGHT SIDE ================= */}
//           <div className="w-full sm:w-1/2 bg-[#f7d8d8]">

//             <img
//               src={assets.hero_img}
//               alt="Latest fashion collection"
//               className="w-full h-full object-cover object-center"
//             />

//           </div>

//         </div>

//       </div>
//     </section>
//   )
// }

// export default Hero

