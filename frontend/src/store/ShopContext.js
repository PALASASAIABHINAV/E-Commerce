import { create } from 'zustand'
import {products} from '../assets/frontend_assets/assets'

const useProductStore = create((set, get) => ({
   products: products,
   currency: "₹",
   deliveryFee: 100,
  
}))

export default useProductStore
