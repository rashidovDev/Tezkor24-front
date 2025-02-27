import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { GET } from '../../api/frontApi'
import { ChevronLeft } from 'react-feather'

const SearchBrand = () => {
  const { search } = useParams()
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [selected, setSelected] = useState('restaurants')

  const getSearchItems = async () => {
    const response = await GET(`/front/product-brand?search=` + search)
    setProducts(response.filteredProducts)
    setBrands(response.filteredBrands)
  }

  const url = process.env.REACT_APP_IMAGE

  useEffect(() => {
    getSearchItems()
  }, [search])

  return (
    <div className='md:w-[90%] w-[95%]  mx-auto'>
      <NavLink to="/" className="no-underline w-[100px]  bg-[red]">
        <button className='flex items-center w-[100px] text-[#8E8E93]'><ChevronLeft size={17} /> <span className='mb-[1px]'>Back</span></button>
      </NavLink>

      <div className='w-[235px] h-[50px] flex items-center
      rounded-[15px] bg-[#E7E7EE] text-[#7B7B81] px-2 py-1 relative mt-4 mb-1'>
        {/* <div onClick={() => setSelected('allResults')} className={`${selected === 'allResults' && 'bg-[#fff]'}  py-[9px] px-[18px] mx-1 cursor-pointer  text-[15px] text-[#000] rounded-[10px]`}>All results</div> */}
        <div onClick={() => setSelected('restaurants')} className={`${selected === 'restaurants' && 'bg-[#fff]'} py-[9px] px-[18px]  cursor-pointer  text-[15px] text-[#000] rounded-[10px]`}>Restaurants</div>
        <div onClick={() => setSelected('products')} className={`${selected === 'products' && 'bg-[#fff]'} py-[9px] px-[18px] mx-1  cursor-pointer  text-[15px] text-[#000] rounded-[10px]`}>Products</div>
      </div>

      {/* // Restaurants  */}
      {  selected === 'restaurants' &&
        <div className='my-3  overflow-auto'>
          <h1>Restaurants</h1>
          <div className='container-search-brand'>
          { 
            Array.isArray(brands) && brands.length > 0 ? brands.map((brand, idx) => {
              return (
                <NavLink key={idx + 1} to={`/brand/` + brand._id} className='mt-2 no-underline text-[#000]'>
                  <div className='border border-[#F6F6FB] rounded-[20px] cursor-pointer my-3'>
                    <div className='flex items-center p-3'>
                      <img className='w-1/2 h-[80px] rounded-[10px] mr-2 object-cover' src={`${url}/${brand.image}`} alt="" />
                      <div className='ml-2 lg:text-[25px] md:text-[20px] text-[16px] font-semibold'>{brand.name}</div>
                    </div>
                  </div>
                </NavLink>
              )
            })
              :
              <div className='flex justify-center items-center '>
              <p className='text-[40px]'>Nothing was found</p>  
              </div>
          }
          </div>
         

        </div>
      }

      {/* // Products  */}
      {
        selected === 'products' &&
        <div className={`my-3 }`}>
          <h1>Products</h1>
          {
            Array.isArray(products) && products.length > 0  ?  
              <div className='border border-[#F6F6FB] p-[28px] rounded-[20px] cursor-pointer my-3'>
                <div className='raw mb-[150px]'>
                  {products.map((item, idx) => {
                    return (
                      <div key={idx + 1} className='md:w-[23%] md:float-left bg-[#f2f2f2] p-2 mr-[22px] rounded-md relative mb-3'>
                        <img className='md:w-[250px] w-full object-cover h-[159px] rounded-[10px] ' src={`${url}/${item.image}`} alt="" />
                        <img className='w-[50px] object-cover rounded-[10px] absolute top-[10px] right-[10px]' src={`${url}/${item.brandID.logo}`} alt="" />
                        <p className='my-2 text-[20px]'>{item.name}</p>
                       
                        <NavLink to={`/brand/` + item.brandID._id} className='no-underline text-[#fff]'> <div className=' w-full main-bg py-[2px] mt-3 rounded-md text-center'> {item.price} </div></NavLink>
                       
                      </div>
                    )
                  })}
                </div>
              </div>
              :
              <div className='flex justify-center items-center md:my-[220px]'>
              <p className='text-[40px]'>Nothing was found</p>  
              </div>
          }
        </div>
      }

    </div>
  )
}

export default SearchBrand