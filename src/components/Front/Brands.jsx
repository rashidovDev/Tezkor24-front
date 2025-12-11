import React, { useEffect, useState } from 'react'
import {  GETBRAND, PUT } from '../../api/frontApi'
import { Star, Truck } from 'react-feather'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showModalRegistration } from '../../store/slices/modalSlice';
import Skeleton from '../Skeleton/Skeleton';
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const Brand = ({category}) => {

  const [brand, setBrand] = useState([])
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  const url = process.env.REACT_APP_IMAGE;

  
  let currentUser;

  async function getUser() {
    currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      setUser(currentUser.data.user)
    }
  }

  const getBrands = async () => {
    const response = await GETBRAND(`/front/brand-list?sort=${category}`)
    setBrand(response.brands)
  }


  const doLikes = async (id) => {
    const token = localStorage.getItem("access_token")
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
    if (differenceInHours > 2 || !token) {
      dispatch(showModalRegistration())  
    } else {
      await PUT('/brand/update-likes/' + id)
      getBrands()
    }
  }

  const removeLikes = async (id) => {
    const token = localStorage.getItem("access_token")
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
    if (differenceInHours > 2 || !token) {
      dispatch(showModalRegistration())
    } else {
  
      await PUT('/brand/remove-likes/' + id)
      getBrands()
    }
  }


  function getData() {
    getUser()
    getBrands()
  }

  useEffect(() => {
    getData()
  }, [category])
  
  return (
    <>
      {/* <ModalRegistration /> */}
      <div className='my-3 md:mt-5 mt-3 w-full m-auto'>
        <h1 className='md:text-[35px]  text-[27px] font-bold'>Restaurants</h1>
        {
          brand.length > 0 ? (
            <div className='container-brand mx-auto z-0'>
              {
                Array.isArray(brand) ? brand.map((item, idx) => {
                  return (
                    <div key={idx + 1} className='relative mb-2'>
                       <div className='absolute bottom-[53px] md:right-0 right-1 '>
                       {item.likes.includes(user?.id) ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevents navigation
                                        removeLikes(item._id);
                                      }}
                                      className=" cursor-pointer z-20 flex justify-center items-center w-[25px] h-[25px] right-[15px]"
                                    >
                                      <FaBookmark size={18} />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevents navigation
                                        doLikes(item._id);
                                      }}
                                      className="cursor-pointer  z-20 flex justify-center items-center w-[25px] h-[25px] right-[15px]"
                                    >
                                      <FaRegBookmark size={18} />
                                    </button>
                                  )}
                                
                                </div>
                              

                               
                      <NavLink key={idx + 1} to={`/brand/` + item._id} className='item-brand no-underline mb-3  cursor-pointer'>
                        <div>
                          <div className='relative '>
                            <img className='brightness-[0.95] cursor-pointer item-image z-0 object-cover rounded-[20px] opacity-[1] hover:opacity-[0.8]'
                              src={`${url}${item.image}`} alt="" />
                            {/* {item.logo && <img className='absolute top-[10px] right-[10px] cursor-pointer rounded-t-[20px] w-[60px]'
                         src={`https://tezkor24.onrender.com/${item.logo}`} alt="" />}   */}
                         
                          </div>
                          <div className='mx-2'>
                            <div className=' pt-1'>
                              <div className='flex justify-between '>

                              <div className=' text-[20px] font-bold text-[#000]'>{item.name}</div>
                             
                              <div className='pt-[5px] flex justify-between items-center w-[60px] text-[20px] font-bold text-[#000]'>

                                <div className=' rounded-[5px]  
                                   cursor-pointer flex items-center '>
                                  <span className=''><Star color='#000' width={14} /></span>
                                  <span className='text-[12px] my-[2px]  text-[#7A7A7A]'>{item.rating}</span>
                                </div>        
                               
                              </div>

                              </div>
                            </div>

                            <div className='flex items-center text-[#000]'>
                              <span>< Truck strokeWidth='3px' width={14} /></span> <span className='ml-1 text-[12px]'>{item.deliveryTime}min</span></div>
                            <div className=' pt-[5px] text-[#848484] flex items-center'>
                              <div className='text-[#218A0A] bg-[#E7F2E4] max-w-max px-[8px] py-1 rounded-[15px] text-[12px]'>{item.deliveryFee ? `Delivery Fee: ${item.deliveryFee} sum` : 'Free delivery'}</div>
                              {
                                item.discount > 0 &&   <div className='text-white bg-[#F29314] py-1 max-w-max px-[8px] ml-2 rounded-[15px] text-[12px]'>{item.discount}% off</div>
                              }
                            
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>

                  )
                }) : <div>Loading</div>
              }
            </div>
          ) :
            <div className='container-brand'>         
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
              <Skeleton type='h-[180px] rounded-[15px]' />
            </div>
        }


      </div>

    </>
  )
}

export default Brand

{/* Categories */ }
{/* <div className='flex items-center'>
        <div onClick={() => setCategory("all")}  className={`${category === "all" ? 'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  bg-[#F4F3FB] px-3 mr-2 h-[45px] flex justify-center items-center text-center rounded-[10px] cursor-pointer`}>
          All
        </div>
        <div onClick={() => setCategory("favourites")}  className={`${category === "favourites" ? 'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  px-3 mr-2 h-[45px] flex justify-center items-center text-center rounded-[10px] cursor-pointer`}>
          Favourites
        </div>
        <div onClick={() => setCategory("national")}  className={`${category === "national" ? 'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  bg-[#F4F3FB] px-3 mr-2 h-[45px] flex justify-center items-center text-center rounded-[10px] cursor-pointer`}>
          National food
        </div>
        <div onClick={() => setCategory("turkish")}  className={`${category === "turkish" ? 'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  bg-[#F4F3FB] px-3 mr-2 h-[45px] flex justify-center items-center text-center rounded-[10px] cursor-pointer`}>
          Turkish food
        </div>
        <div onClick={() => setCategory("fastfood")}  className={`${category === "fastfood" ? 'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  bg-[#F4F3FB] px-3 mr-2 h-[45px] flex justify-center items-center text-center rounded-[10px] cursor-pointer`}>
          Fastfood
        </div>

        </div> */}
{/* Brands */ }