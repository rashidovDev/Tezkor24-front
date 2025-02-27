import React, { useEffect, useState } from 'react'
import { GET } from '../../../api/frontApi'
import { NavLink } from 'react-router-dom';


const Offers = () => {
     const [brand, setBrand] = useState([])

     const url = process.env.REACT_APP_IMAGE;

    const getBrands = async () => {
            const response = await GET('/brand/front/offer')
            setBrand(response)
          }
  
           function getData() {
              getBrands()
            }
          
            useEffect(() => {
              getData()
            }, [])

  return (
    <div className='w-[90%] mx-auto'>
    <div className='text-[24px] font-bold text-center mb-[25px]'>Offers</div>
    <div className='h-[500px] overflow-y-auto'>
        {
            Array.isArray(brand) ? brand.map((item, idx) => (
                <NavLink to={`/brand/` + item._id} key={idx + 1} className=''>
                  <div className='w-full object-cover my-3'>
                  <img className='w-full rounded-[10px] h-[80px]  object-cover' src={`${url}${item.image}`} alt="" />
                  </div>
                   
                </NavLink>
            )) : <div></div>
        }
    </div>
</div>
  )
}

export default Offers