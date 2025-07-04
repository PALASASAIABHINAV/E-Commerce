import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useProductStore from "../store/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useProductStore();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity duration-500 opacity-100">
      {/*product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*product images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt="product"
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0  cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product" className="w-full h-auto" />
          </div>
        </div>
      </div>
      {/*product details */}
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <img src={assets.star_icon} alt="star"  className="w-3 h-3"/>
          <img src={assets.star_icon} alt="star"  className="w-3 h-3"/>
          <img src={assets.star_icon} alt="star"  className="w-3 h-3"/>
          <img src={assets.star_icon} alt="star"  className="w-3 h-3"/>
          <img src={assets.star_icon} alt="star"  className="w-3 h-3"/>
          <p className="pl-2">(122)</p>
         </div>
         <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
         <p className="mt-5 md:w-4/5 text-gray-500">{productData.description}</p>
         <div className="flex flex-col gap-4 my-8">
          <p>Select Size</p>
          <div className="flex gap-2">
            {
              productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${size===item ? 'border-black text-orange-500' : ''}`}>{item}</button>
              ))
            }

          </div>
         </div>
         <button onClick={()=>{
           if(!size) {
             toast.error("Please select a size before adding to cart!");
             return;
           }
           addToCart(productData._id,size);
           toast.success("Item added to cart successfully!");
         }} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded">ADD TO CART</button>
         <hr  className="mt-8 sm:w-4/5"/>
         <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original Product</p>
          <p>Cash on Delivery Available</p>
          <p>Easy Return Policy</p>
         </div>
      </div>   

      {/*description and reviews */}
      <div className="mt-20 ">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm  text-gray-600">
          <p>{productData.description}{productData.description}</p>
          <p>{productData.description}{productData.description}</p>
          <p>{productData.description}{productData.description}</p>
        </div>
      </div>


      {/*related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
