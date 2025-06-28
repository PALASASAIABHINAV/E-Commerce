import { create } from 'zustand'
import {products} from '../assets/frontend_assets/assets'

const useProductStore = create((set, get) => ({
   products: products,
   currency: "₹",
   deliveryFee: 100,
   search: '',
   setSearch: (search) => set({search}),
   showSearch: false,
   setShowSearch: (showSearch) => set({showSearch}),
   cart: {},
   setCart: (cart) => set({cart}),

   addToCart: async (itemId,size) => {
     let cartData = get().cart || {};
     cartData = structuredClone(cartData);
     if(cartData[itemId]){
       if(cartData[itemId][size]){
         cartData[itemId][size]++;
       }else{
         cartData[itemId][size] = 1;
       }
     }else{
      cartData[itemId] ={};
      cartData[itemId][size] = 1;
     }
     console.log('Item added to cart:', { itemId, size, cartData });
     set({cart:cartData});
   },

   increaseQuantity: (itemId, size) => {
     let cartData = structuredClone(get().cart || {});
     if(cartData[itemId] && cartData[itemId][size]) {
       cartData[itemId][size]++;
       set({cart: cartData});
     }
   },

   decreaseQuantity: (itemId, size) => {
     let cartData = structuredClone(get().cart || {});
     if(cartData[itemId] && cartData[itemId][size]) {
       if(cartData[itemId][size] > 1) {
         cartData[itemId][size]--;
       } else {
         delete cartData[itemId][size];
         if(Object.keys(cartData[itemId]).length === 0) {
           delete cartData[itemId];
         }
       }
       set({cart: cartData});
     }
   },

   removeFromCart: (itemId, size) => {
     let cartData = structuredClone(get().cart || {});
     if(cartData[itemId] && cartData[itemId][size]) {
       delete cartData[itemId][size];
       if(Object.keys(cartData[itemId]).length === 0) {
         delete cartData[itemId];
       }
       set({cart: cartData});
     }
   },

   getDummyOrders: () => {
     // Return a slice of products as dummy orders
     const today = new Date();
     const dateStr = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
     return products.slice(0, 3).map((product, idx) => ({
       _id: product._id,
       quantity: 1,
       size: product.sizes[0],
       date: dateStr,
     }));
   },

}))

export default useProductStore
