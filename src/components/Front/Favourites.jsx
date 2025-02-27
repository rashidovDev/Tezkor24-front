import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import { GET } from '../../api/frontApi'
import Skeleton from '../Skeleton/Skeleton'

const Favourites = () => {

  const [product, setProduct] = useState([])

  async function getFavourites(){
    const response = await GET('/front/favourite')
    setProduct(response)
    }

    useEffect(() => {
    getFavourites()
    },[])

  return (
    <>    
   <div className='md:my-3 z-10 '>
      <h1 className='md:text-[35px]  text-[25px] font-bold'>Popular foods</h1>
      {
        product.length > 0 ? 
        <Carousel product={product}/>
        :  
        <div className='container-favourite'>
        
              <Skeleton type='h-[90px] favourite-image rounded-[15px]' />
              <Skeleton type='h-[90px] favourite-image rounded-[15px]' />
              <Skeleton type='h-[90px] favourite-image rounded-[15px]' />
              <Skeleton type='h-[90px] lg:block  favourite-image rounded-[15px]' />
              <Skeleton type='h-[90px] lg:block hidden favourite-image rounded-[15px]' />

              <Skeleton type='h-[90px] lg:block hidden favourite-image rounded-[15px]' />
              <Skeleton type='h-[90px] md:block hidden favourite-image rounded-[15px]' />
        </div>
      }    
  </div>  
    </>
  )
}

export default Favourites