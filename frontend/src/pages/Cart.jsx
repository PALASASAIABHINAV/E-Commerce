import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProductStore from '../store/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const {cart, products, currency, increaseQuantity, decreaseQuantity, removeFromCart} = useProductStore();
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    const tempCartData = [];
    let total = 0;
    for(const items in cart){
      for(const size in cart[items]){
        if(cart[items][size] > 0){
          const productData = products.find((product)=>product._id === items);
          const itemTotal = productData.price * cart[items][size];
          total += itemTotal;
          tempCartData.push({
            _id: items,
            size: size,
            quantity: cart[items][size],
            productData: productData,
            itemTotal: itemTotal
          });
        }
      }
    }
    setCartData(tempCartData);
    setTotalAmount(total);
  },[cart, products])

  const handleIncreaseQuantity = (itemId, size) => {
    increaseQuantity(itemId, size);
    toast.success('Quantity increased!');
  };

  const handleDecreaseQuantity = (itemId, size) => {
    decreaseQuantity(itemId, size);
    toast.info('Quantity decreased!');
  };

  const handleRemoveFromCart = (itemId, size) => {
    removeFromCart(itemId, size);
    toast.error('Item removed from cart!');
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-8'>
        <Title text1="Your" text2="Cart" />
      </div>
      
      {cartData.length === 0 ? (
        <div className='text-center py-16'>
          <div className='text-gray-400 text-6xl mb-4'>🛒</div>
          <h3 className='text-xl font-medium text-gray-700 mb-2'>Your cart is empty</h3>
          <p className='text-gray-500 mb-6'>Add some products to get started!</p>
          <button 
            onClick={() => navigate('/collection')}
            className='bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors'
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm border'>
              {cartData.map((item, index) => (
                <div key={index} className={`p-6 ${index !== cartData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className='flex items-start gap-4'>
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                      <img 
                        src={item.productData.image[0]} 
                        alt={item.productData.name} 
                        className='w-20 h-20 object-cover rounded-lg border'
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 mb-1 line-clamp-2'>
                        {item.productData.name}
                      </h3>
                      <p className='text-sm text-gray-500 mb-2'>Size: {item.size}</p>
                      <p className='text-lg font-semibold text-gray-900'>
                        {currency}{item.productData.price}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center border border-gray-200 rounded-lg'>
                        <button 
                          onClick={() => handleDecreaseQuantity(item._id, item.size)}
                          className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors'
                        >
                          -
                        </button>
                        <span className='px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center'>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleIncreaseQuantity(item._id, item.size)}
                          className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors'
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => handleRemoveFromCart(item._id, item.size)}
                        className='text-red-500 hover:text-red-700 transition-colors p-2'
                        title='Remove from cart'
                      >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>Item Total:</span>
                      <span className='font-semibold text-gray-900'>{currency}{item.itemTotal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm border p-6 sticky top-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Order Summary</h3>
              
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal ({cartData.length} items)</span>
                  <span className='font-medium'>{currency}{totalAmount}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Delivery Fee</span>
                  <span className='font-medium'>{currency}100</span>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between text-lg font-semibold'>
                  <span>Total</span>
                  <span>{currency}{totalAmount + 100}</span>
                </div>
              </div>
              
              {/* Coupon Code */}
              <div className='mb-6'>
                <div className='flex gap-2'>
                  <input 
                    type="text" 
                    placeholder='Enter Coupon Code' 
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                  />
                  <button className='bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors'>
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/place-order')}
                className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
              >
                Proceed to Checkout
              </button>
              
              {/* Continue Shopping */}
              <button 
                onClick={() => navigate('/collection')}
                className='w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
