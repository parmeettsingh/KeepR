import React from 'react'

const Footer = () => {
  return (
      <div className='bg-violet-800 text-white flex justify-center items-center w-full'>
        <div className='logo font-bold text-2xl'>
          <span className='text-sm'>
            &copy; 2025 Keepr. All rights reserved.
          </span>
          <div className='flex justify-center items-center gap-4'>  
            <a href='#' className='hover:underline'>Privacy Policy</a>
            <a href='#' className='hover:underline'>Terms of Service</a>
          </div>
        </div>
      </div>    
  )
}

export default Footer
