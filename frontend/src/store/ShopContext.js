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
  
}))

export default useProductStore
