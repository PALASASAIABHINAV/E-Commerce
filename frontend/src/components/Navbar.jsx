import React, { useState } from 'react'
import logo from '../assets/frontend_assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import search from '../assets/frontend_assets/search_icon.png'
import user from '../assets/frontend_assets/profile_icon.png'
import cart from '../assets/frontend_assets/cart_icon.png'
import menu from '../assets/frontend_assets/menu_icon.png'
import cross from '../assets/frontend_assets/cross_icon.png'
import dropdown from '../assets/frontend_assets/dropdown_icon.png'
import useProductStore from '../store/ShopContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle dropdown toggle on mobile
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const {setShowSearch} = useProductStore();

  // Function to close menu when a link is clicked (mobile UX)
  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
     <Link to='/'> <img src={logo} alt="Logo" className='w-36' /> </Link>
      {/* Desktop Nav */}
      <ul className={`hidden sm:flex gap-5 text-sm text-gray-700`}>
        <NavLink className='flex flex-col items-center gap-1' to='/' onClick={handleLinkClick}>
          <p>Home</p>
          <hr className='w-2/4 hidden h-[2px] bg-gray-700 border-none'></hr>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/collection' onClick={handleLinkClick}>
          <p>Collection</p>
          <hr className='w-2/4 hidden h-[2px] bg-gray-700 border-none'></hr>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/about' onClick={handleLinkClick}>
          <p>About</p>
          <hr className='w-2/4 hidden h-[2px] bg-gray-700 border-none'></hr>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/contact' onClick={handleLinkClick}>
          <p>Contact</p>
          <hr className='w-2/4 hidden h-[2px] bg-gray-700 border-none'></hr>
        </NavLink>
      </ul>

      {/* Hamburger/Cross Icon for Mobile */}
      <img
        src={menuOpen ? cross : menu}
        alt={menuOpen ? "Close Menu" : "Open Menu"}
        className='w-7 cursor-pointer sm:hidden z-30'
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      {/* Mobile Nav */}
      <ul
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg flex flex-col gap-8 pt-24 px-8 text-gray-700 text-base font-medium z-20 transition-transform duration-300 sm:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <NavLink to='/' onClick={handleLinkClick} className='block'>Home</NavLink>
        <NavLink to='/collection' onClick={handleLinkClick} className='block'>Collection</NavLink>
        <NavLink to='/about' onClick={handleLinkClick} className='block'>About</NavLink>
        <NavLink to='/contact' onClick={handleLinkClick} className='block'>Contact</NavLink>
        <div className='flex gap-6 mt-8'>
          <img onClick={()=>setShowSearch(true)} src={search} alt="Search" className='w-5 cursor-pointer' />
          <div className='relative'>
            <img
              src={user}
              alt="User"
              className='w-5 cursor-pointer'
              onClick={handleDropdownToggle}
            />
            {/* Dropdown for mobile */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 shadow-md rounded-md text-gray-700 font-medium z-30'>
                <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>My Profile</p>
                <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>My Orders</p>
                <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>Logout</p>
              </div>
            )}
          </div>
          <Link to='/cart' className='relative'>
            <img src={cart} alt="Cart" className='w-5 cursor-pointer' />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-white bg-black aspect-square rounded-full text-[8px]'>10</p>
          </Link>
        </div>
      </ul>

      {/* Desktop Icons */}
      <div className='hidden sm:flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={search} alt="Search" className='w-5 cursor-pointer' />
        <div className='group relative'>
          <img
            src={user}
            alt="User"
            className='w-5 cursor-pointer'
          />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-gray-100 shadow-md rounded-md text-gray-700 font-medium'>
              <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>My Profile</p>
              <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>My Orders</p>
              <p className='hover:text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <img src={cart} alt="Cart" className='w-5 cursor-pointer' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-white bg-black aspect-square rounded-full text-[8px]'>10</p>
        </Link>
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-30 z-10 sm:hidden' onClick={() => setMenuOpen(false)}></div>
      )}
    </div>
  )
}

export default Navbar
