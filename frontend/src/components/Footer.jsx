import React from 'react'
import logo from '../assets/frontend_assets/logo.png'

const Footer = () => {
  return (
    <div className='my-10'>
      <div className='flex flex-col sm:flex-row justify-between gap-10'>
        <div>
            <img src={logo} alt="logo" className='mb-5 w-32' />
            <p className='w-full sm:w-1/2 text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9502551724</li>
                <li>psaiabhinav1724@gmail.com</li>
                <li>Andra Pradesh, India</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />

        <p className='py-5 text-sm text-center text-gray-500'>Copyright &copy; 2025 All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
