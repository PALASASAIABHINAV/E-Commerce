import React from 'react'
import useProductStore from '../store/ShopContext'

const LatestCollection = () => {
    const {products} = useProductStore()
    console.log(products);   

  return (
    <div>

    </div>
  )
}

export default LatestCollection
