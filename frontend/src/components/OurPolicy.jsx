import React from 'react'
import exchange_icon from '../assets/frontend_assets/exchange_icon.png'
import quality_icon from '../assets/frontend_assets/quality_icon.png'
import support_icon from '../assets/frontend_assets/support_img.png'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gary-700'>
      <div>
        <img src={exchange_icon} alt="image" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Easy Exchange</p>
        <p className='text-gray-500'>We Offer hassle free exchange.</p>
      </div>
      <div>
        <img src={quality_icon} alt="image" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>7 days Return Policy</p>
        <p className='text-gray-500'>We provide 7 days free return policy.</p>
      </div>
      
      <div>
        <img src={support_icon} alt="image" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>24/7 Support</p>
        <p className='text-gray-500'>We provide 24/7 support.</p>
      </div>
      
    </div>
  )
}

export default OurPolicy
