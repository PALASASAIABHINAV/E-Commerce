import React from 'react'
import { toast } from 'react-toastify';

const NewsletterBox = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if(!email){
            toast.error("Please enter your email");
            return;
        }
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & get 20% off</p>
        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>  
            <input type="email" name='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 uppercase rounded'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox
