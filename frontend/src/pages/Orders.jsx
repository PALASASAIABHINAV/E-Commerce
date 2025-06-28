import React from 'react';
import Title from '../components/Title';
import useProductStore from '../store/ShopContext';
import { products } from '../assets/frontend_assets/assets';

const Orders = () => {
  const getDummyOrders = useProductStore(state => state.getDummyOrders);
  const orders = getDummyOrders();

  return (
    <div className="border-t pt-10 px-2 md:px-10 lg:px-24 xl:px-40 pb-10">
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <div className="text-gray-500 text-center py-16">No orders found.</div>
        ) : (
          orders.map((order, idx) => {
            const product = products.find(p => p._id === order._id);
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 bg-white border rounded-lg shadow-sm p-6">
                <img src={product.image[0]} alt={product.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-base mb-1">{product.name}</div>
                    <div className="text-gray-700 text-sm mb-1">{`₹${product.price}`} &nbsp; Quantity: {order.quantity} &nbsp; Size: {order.size}</div>
                    <div className="text-gray-400 text-xs">Date: {order.date}</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      Ready to ship
                    </span>
                    <button className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">Track Order</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
