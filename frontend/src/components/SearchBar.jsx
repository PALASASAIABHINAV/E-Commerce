import React, { useEffect, useState } from 'react'
import useProductStore from '../store/ShopContext';
import {assets} from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useProductStore();
    const location = useLocation();
     


  return showSearch&&location.pathname.includes('/collection') ? (
    <div className='boder-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
             <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
             <img src={assets.search_icon} alt="search" className='w-4 ' />
        </div>
        <img src={assets.cross_icon} alt="cross" className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)} />
        
    </div>
  ) : null
}

export default SearchBar
