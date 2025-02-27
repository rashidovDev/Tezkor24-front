import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, Delete, Star, Trash2, Truck } from 'react-feather'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { checkToken, PUT } from '../../../../api/frontApi'

const FavouriteBrands = () => {
    const [brand, setBrand] = useState()
    const [user, setUser] = useState()
    let currentUser;

     const navigate = useNavigate()
      const dispatch = useDispatch()

    const url = process.env.REACT_APP_SERVER_API;

  async function getUser() {
    currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      setUser(currentUser.data.user)
    }
  }

  const removeLikes = async (id) => {
    await checkToken()
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
     await PUT('/brand/remove-likes/' + id)
     getFavouriteBrands()
    } else {
      // dispatch(showModalRegistration())
      // dispatch(hideBasket())
    }
  }
    const getFavouriteBrands = async () => {
    const response = await axios.get(`${url}/brand/front/favourite`,
    {headers : {Authorization : `Bearer ` + localStorage.getItem('access_token')}})
    setBrand(response.data.likedRestaurants)
    }

    useEffect(() => {
        getFavouriteBrands()
        getUser()
    }, [])



  return (
    <div className=''>
       <NavLink to="/" className="no-underline md:hidden ">
                    <button className='flex justify-start items-center ml-3  text-[#8E8E93]'>
                      <ChevronLeft size={17} /> <span className='mb-[1px]'>Back</span></button>
                  </NavLink>
    <div className='my-3  lg:h-[450px]  overflow-auto'>

    {
        
            <div className={`${brand && 'favourite-brand'}  mx-auto`}>
              {
                Array.isArray(brand) && brand.length > 0 ? brand.map((item, idx) => {
                  return (
                    <div className='relative mb-2'>
                       <div className='absolute bottom-1 right-0'>
                                  
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevents navigation
                                        removeLikes(item._id);
                                      }}
                                      className="z-20  cursor-pointer flex justify-center items-center w-[25px] h-[25px] right-[15px]"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  
                                  
                                </div>
                      <NavLink key={idx + 1} to={`/brand/` + item._id} className='item-brand no-underline mb-3 '>
                        <div>
                          <div className='relative '>
                            <img className='brightness-[0.95] favourite-image z-0 object-cover rounded-[20px] opacity-[1] hover:opacity-[0.8]'
                              src={`http://localhost:5500/${item.image}`} alt="" />
                            {/* {item.logo && <img className='absolute top-[10px] right-[10px] cursor-pointer rounded-t-[20px] w-[60px]'
                         src={`https://tezkor24.onrender.com/${item.logo}`} alt="" />}   */}
                          </div>
                          <div className='mx-2'>
                            <div className='flex justify-between pt-1'>
                              <div className=' text-[18px] font-bold text-[#000]'>{item.name}</div>
                          
                            </div>

                            
                          </div>
                        </div>
                      </NavLink>
                    </div>

                  )
                }) :<div className='flex justify-center items-center w-[95%] mx-auto h-[350px]'>
                <div className='md:text-[28px] text-[24px] text-center'>You have no favourite restaurants</div>
              </div>
              }
            </div>
        
        }
          
        

        </div>
  </div>
  )
}

export default FavouriteBrands