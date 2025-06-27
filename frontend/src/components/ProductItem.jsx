import React from 'react'
import useProductStore from '../store/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
  const {currency } = useProductStore();

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
         <div className='overflow-hidden'>
          <img className='hover:scale-110 transition-all duration-300 ease-in-out' src={image[0]} alt="image" />

         </div>
         <p className='pt-3 pb-1 text-sm'>{name}</p>
         <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
