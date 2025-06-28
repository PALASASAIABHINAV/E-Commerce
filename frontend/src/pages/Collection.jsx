import React, { useEffect, useState } from 'react'
import useProductStore from '../store/ShopContext'
import dropdown_icon from '../assets/frontend_assets/dropdown_icon.png'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
   const {products,search,showSearch}=useProductStore();
   const [showFilters, setShowFilters] = useState(false);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [category,setCategory] = useState([]);
   const [subcategory,setSubcategory] = useState([]);
   const [sortBy,setSortBy] = useState('relavent');

   const toggleFilter=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value));
    }else{
      setCategory(prev=>[...prev,e.target.value]);
    }
   }

   const toggleSubcategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev=>prev.filter(item=>item!==e.target.value));
    }else{
      setSubcategory(prev=>[...prev,e.target.value]);
    }
   }

   
   
   const applyFilter=()=>{
    let productsCopy=products.slice();
    
    if(showSearch&&search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }
    setFilteredProducts(productsCopy);
    if(subcategory.length>0){
      productsCopy=productsCopy.filter(item=>subcategory.includes(item.subCategory));
    }
    setFilteredProducts(productsCopy);
   }

   const sortProduct=()=>{
      let fpCopy=filteredProducts.slice();

      switch(sortBy){
        case  'low-to-high':
          setFilteredProducts(fpCopy.sort((a,b)=>a.price-b.price));
          break;
        case  'high-to-low':
          setFilteredProducts(fpCopy.sort((a,b)=>b.price-a.price));
          break;
        default:
          setFilteredProducts(fpCopy);
          break;
      }

   }

   useEffect(()=>{
    applyFilter();
   },[category,subcategory,search,showSearch]);

   useEffect(()=>{
    sortProduct();
   },[sortBy]);


   useEffect(()=>{
    setFilteredProducts(products);
   },[]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>
      {/* left side(filters) */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS  <img src={dropdown_icon} alt="image" className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''} `} /></p>
        {/* category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilters ? ' ' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleFilter} />Men
             </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleFilter} />Women
             </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleFilter} />Kids
             </p>
           </div>
        </div>
        {/*sub category */}
        <div className={`border border-gray-300 pl-5 py-3 my-6 sm:block ${showFilters ? ' ' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>TYPE</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubcategory} /> Topwear
             </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubcategory} /> Bottomwear
             </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubcategory} /> Winterwear
             </p>
           </div>
        </div>

      </div>

      {/*right side(products) */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/*product sorting */}
          <select className='boder-2 border-gray-300 text-sm px-2' onChange={(e)=>setSortBy(e.target.value)}>
            <option value="relavent">Relavent</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/*products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((product,index)=>(
              <ProductItem key={index} id={product._id} name={product.name} price={product.price} image={product.image}/>
            ))
          }
        </div>

      </div>
      

    </div>
  )
}

export default Collection
