import React from 'react'

const Title=({text1,text2}) =>{
  return (
    <div className='inline-flex gap-2 items-center pt-4 font-semibold text-3xl text-gray-800 '>
        <p className=' '>{text1} <span className=''>{text2}</span></p>
        {/* <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p> */}
    </div>
  )
}

export default Title
