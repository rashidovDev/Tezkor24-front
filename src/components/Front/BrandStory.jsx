import React, { useEffect, useState } from 'react'
import {  ChevronLeft, Minus, Plus,  Search } from 'react-feather'
import { BsInfoLg } from "react-icons/bs";
import { Link } from "react-scroll"
import { NavLink, useParams } from 'react-router-dom'
import { motion } from "framer-motion"
import { GET, PUT } from '../../api/frontApi';
import Skeleton from '../Skeleton/Skeleton';
import "../Skeleton/skeleton.css"
import ModalProduct from '../Modal/ModalProduct';
import { useDispatch, useSelector } from 'react-redux';
import { hideModalProduct, showModalExactBrand, showModalProduct, showModalRegistration } from '../../store/slices/modalSlice';
import { addItemToCart, removeItemFromCart, setBrandID, setProductID, showBasket } from '../../store/slices/basketSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const BrandStory = () => {
  const { id } = useParams()
  const [category, setCategory] = useState("all")
  const [quantity, setQuantity] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [brand, setBrand] = useState({})
  const [product, setProduct] = useState([])
  const [categoryFixed, setCategoryFixed] = useState(false)
  const [infoIsVisible, setInfoIsVisible] = useState(false)
  const [productId, setProductId] = useState([])
  const [user, setUser] = useState()
  const url = process.env.REACT_APP_IMAGE;
  const [search, setSearch] = useState('')

  const style = {
    backgroundColor: '#F29314'
  }

  let currentUser;
  let brandID = useSelector(state => state.basket.brandID)

  async function getUser() {
    currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      setUser(currentUser.data.user)
    }
  }

  const getBrand = async () => {
    const response = await GET(`/front/brand/` + id)
    setBrand(response)
    setCategory(response.subcategory)
  }

  const doLikes = async (id) => {
    const token = localStorage.getItem("access_token")
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
    if (differenceInHours > 2 || !token) {
      dispatch(showModalRegistration())  
    } else {
      await PUT('/brand/update-likes/' + id)
      getBrand()
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
      getBrand()
    }
  }


  const getProduct = async () => {
    const response = await GET(`/front/product/?id=${id}&search=${search}`)
    setProduct(response.filteredProducts)
  }

  const getData = async () => {
    await getUser()
    await getBrand()
    await getProduct()
  }


  const dispatch = useDispatch()
  const modalExactBrand = useSelector(state => state.modal.modalExactBrand)
  const orders = useSelector(state => state.basket.items)
  const totalQuantity = useSelector(state => state.basket.totalQuantity)
  const productID = useSelector(state => state.basket.productID)
 
  useEffect(() => {
    getData()
    window.addEventListener("scroll", () => {
      if (window.scrollY > 675) {
        setCategoryFixed(true)
      } else {
        setCategoryFixed(false)
      }
    })
  }, [search])
  return (
    <div>
     
      <ModalProduct>
        <div className='p-1 md:w-[400px] w-[320px]'>
          <div className='relative bg-[#fff] flex justify-center flex-col items-center'>
            <img className='w-[60%]   rounded-[10px] object-cover' src={`${url}${selectedProduct.image}`} alt="" />
            {/* <img className='w-[70px] absolute top-1 right-1' src={`${url}/${brand.logo}`} alt="" /> */}
           
          </div>
          <div>
          <div className='md:text-[30px] text-[24px] font-bold'>{selectedProduct.name}</div>
          <p className='text-[#848484] md:w-[400px] text-[12px] md:text-[16px] w-full py-1 '>{selectedProduct.description}</p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1} className={`${quantity === 1 && 'text-[#848484]'} p-2 bg-[#E7E7EA] md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex justify-center items-center rounded-md`}><Minus /></button>
              <div className='px-3 text-[22px]'>{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className='p-2 bg-[#E7E7EA] md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex justify-center items-center rounded-md'><Plus /></button>
            </div>
            <div className='w-full main-bg ml-4 md:h-[50px] h-[40px] p-2 rounded-md text-[#fff] flex justify-center text-[16px] md:text-[22px]'>
              <button
                onClick={() => {
                  setProductId((prev) => [...prev, selectedProduct._id])
                  dispatch(setProductID(selectedProduct._id))
                  dispatch(addItemToCart({ ...selectedProduct, quantity }))
                  setQuantity(1)
                  dispatch(hideModalProduct())
                  dispatch(setBrandID(selectedProduct.brandID))
                }}
              >Add to basket</button>
            </div>
          </div>
        </div>
      </ModalProduct>

      <div onClick={() => setInfoIsVisible(false)} className=' relative md:w-[90%] w-[95%] md:mt-5 mx-auto'>
        <div className=''>
          <div>
            <NavLink to="/" className="no-underline w-[100px]  bg-[red]">
              <button className='flex items-center w-[100px] text-[#8E8E93]'><ChevronLeft size={17} /> <span className='mb-[1px]'>Back</span></button>
            </NavLink>
            <div className='mb-5 mt-[20px]'>
              {/* BRAND Header */}
              {

                brand ? (
                  <>
                    <div className='relative'>
                      <div className='flex md:justify-start justify-center'>
                      <img className='md:w-[70%] md:h-[400px] 
                        w-full  h-[237px] object-cover rounded-[20px] brightness-[0.7]' 
                        src={`${url}${brand.image}`} alt="" />
                      </div>
                    
                      <div className='absolute md:top-[220px] top-[160px] px-8'>
                        <div className='text-[#fff] md:text-[45px] text-[25px] font-bold ml-1'>{brand.name}</div>
                        <div className='flex items-center text-[16px]'>
                          <div className='md:py-1 px-2 bg-[#F4F3FB] mx-[6px] rounded-[15px] flex items-center'>
                            <img className='w-[14px] h-[14px] mr-1' src={require("../../assets/newstar.png")} alt="" />
                            <span className='text-[13px] md:text-[16px]'>{brand.rating}</span>
                          </div>
                          <div className='md:py-1  px-2 bg-[#F4F3FB] text-[13px] mx-1 rounded-[16px] md:text-[16px]'>Delivery time &#xb7; {brand.deliveryTime} min</div>
                          {
                            Array.isArray(brand.likes) &&
                              brand.likes.includes(user?.id) ?
                              <button
                                onClick={() => removeLikes(brand._id)}
                                className='z-10 cursor-pointer bg-[#fff]  md:w-[30px] md:h-[30px] w-[20px] h-[20px] 
                        flex justify-center items-center  shadow-brand right-[15px]  rounded-full'>
                                <FaHeart className="" color='red' size={13} />
                              </button>
                              :
                              <button
                                onClick={() => doLikes(brand._id)}
                                className='z-10  cursor-pointer bg-[#fff] bottom-[115px] flex justify-center items-center  
                        md:w-[30px] md:h-[30px] w-[20px] h-[20px]  shadow-brand right-[15px]  rounded-full'>
                                <FaRegHeart className="" size={13} />
                              </button>
                          }
                          <div className='relative'>
                            <button onClick={(e) => {
                              setInfoIsVisible(!infoIsVisible)
                              e.stopPropagation()
                            }} className='p-2 mx-1 bg-[#F4F3FB]  md:w-[30px] md:h-[30px] w-[20px] h-[20px] rounded-full absolute md:top-[-15px] top-[-10px]'>
                              <BsInfoLg className='absolute md:top-[8px] top-[3px] md:left-[7px] left-[4px]' size={13} />
                            </button>
                            {
                              infoIsVisible &&
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                className='absolute top-[40px] z-10 rounded-[20px] bg-[#fff] 
                                shadow md:w-[340px] w-[250px] md:right-[-100px] right-[-50px] p-3'>
                                <h4>{brand.name}</h4>
                                <div className='my-[5px] text-[#8E8E93] pb-[10px] border-b-[1px] border-[#F6F6FB]'>Work schedule: {brand.workSchedule?.open ?
                                 `${brand.workSchedule.open} - ${brand.workSchedule.close}` : brand.workSchedule}
                                </div>
                                <p className='border-b-[1px] border-[#F6F6FB] pb-4'>{brand.description}</p>
                                <div className='pt-[5px] text-[#848484] '>  {brand?.category?.join(" · ")}
                                  
                                 </div>
                              </motion.div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Discount */}
                    <div className='color-gradient md:w-[400px] w-[80%] px-3 pt-3 my-4 rounded-[15px]'>
                      <h6 className='font-bold'>Discount for delivering</h6>
                      <p className='mt-1 pb-3 text-[15px]'>Free delivering</p>
                    </div>

                  </>
                ) : (
                  <>
                    <div className='relative w-full mx-auto'>
                      <Skeleton type='md:w-[900px]  h-[380px]  rounded-[20px]' src={require("../../assets/oqtepa.jpg")} alt="" />
                    </div>

                    {/* Discount */}
                    <div className=''>
                      <Skeleton type='color-gradient md:w-[400px] w-[80%] h-[80px] px-3 pt-3 my-4 rounded-[15px]' />
                    </div>

                  </>
                )
              }


              {/* Search */}
              <div className='relative w-full  mb-4'>
                <div className='absolute top-[27px] left-[10px]'><Search className="mr-2" size={13} /></div>
                <div>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} name='email' autoComplete='off'
                    type="email" placeholder='...Search food' 
                    className="w-full rounded-[12px] py-[12px] px-[35px] border border-[#E4E4E7] outline-none mt-2 " />
                </div>
              </div>

              {/* Category */}
              <div className={`${categoryFixed ? 'fixed top-[75px] w-[90%]  mx-auto' : ''} 
              z-10 top-[30px] overflow-auto rounded-b-[10px]  py-2 flex justify-between pt-3 bg-[#fff]`}>

                <div className='flex justify-start items-center'>
                  {
                    Array.isArray(category) ?
                      category.map((cat, idx) => {
                        return (
                          <div key={idx + 1} className='text-[#000]'>
                            <Link
                              to={cat}
                              spy={true}
                              smooth={true}
                              offset={50}
                              duration={1000}
                              activeStyle={style}
                              onClick={() => setSelectedCategory(cat)}
                              className={`${selectedCategory === cat ?
                                'main-bg text-[#fff]' : 'bg-[#F4F3FB]'}  ${selectedCategory === cat && 'text-[#555] active'} 
                               no-underline text-[#000] bg-[#F4F3FB] px-3 mr-2 h-[45px] 
                      flex justify-center md:text-[15px] text-[15px] items-center text-center rounded-[10px] cursor-pointer`}>
                              {cat}</Link>
                          </div>
                        )
                      })

                      :
                      <div className='main-bg p-2'>Category</div>
                  }
                </div>
                <button onClick={(e) => {
                  e.stopPropagation()

                  dispatch(showBasket())
                }} className='main-bg z-10 hidden md:flex  w-[160px] rounded-[20px] pb-1 items-center px-1'>
                  <span className='pl-1 pt-1'>Shopping Cart</span>  <span className='text-[22px] px-[6px]'>|
                  </span> <span className=' pt-1'>{totalQuantity}</span>
                </button>

              </div>

              {/* Products */}
              <div className='w-full'>
                {
                  Array.isArray(category) ?
                    category.map((cat, keyId) => {
                      return (
                        <div name={cat} key={keyId} className='my-5'>
                          <h2 className={`${categoryFixed ? ' mt-[30px]' : ''}`}>{cat}</h2>
                          {product.length > 0 ?
                            (
                              <div className='md:mt-2 container-product w-full'>
                                {
                                  Array.isArray(product) ? (
                                    product.map(prod => {
                                      if (prod.category === cat) {
                                        return (
                                          < >
                                            <div key={prod} className='hidden md:block bg-[#F3F1EE] 
                                             shadow my-4 p-2 rounded-[10px] relative '>
                                              <div className='relative w-[90%] mx-auto'>
                                                <img className=' object-cover w-full h-[169px] rounded-[10px]' src={`${url}/${prod.image}`} alt="" />
                                                {/* <img className='w-[60px] absolute top-1 right-1' src={`${url}/${brand.logo}`} alt="" /> */}
                                                
                                              </div>
                                              <h5 className='py-2 px-1 text-[22px]'>{prod.name.slice(0, 20)}</h5>
                                              {
                                                productID && productID.includes(prod._id) ?
                                                  orders &&
                                                  
                                                  orders.map(order => order.id === prod._id &&
                                                    <div className='flex w-full items-center justify-between cursor-pointer'>
                                                      <div
                                                        onClick={() => {
                                                          if (order.quantity > 1) {
                                                            dispatch((removeItemFromCart(prod._id)))
                                                          }
                                                        }}
                                                        className='main-bg w-[50px] h-[40px] rounded-md flex justify-center items-center'><Minus /></div>
                                                      <div className='text-[30px]'>

                                                        <div>{order.quantity}</div>

                                                      </div>
                                                      <div
                                                        onClick={() => dispatch(addItemToCart(prod))}
                                                        className='main-bg cursor-pointer w-[50px] h-[40px] rounded-md flex justify-center items-center'><Plus /></div>
                                                    </div>
                                                  )
                                                  :
                                                  <div className='flex items-center mt-3 mb-2 px-1 justify-between'>
                                                    <div className='text-[18px]'> {prod.price}{`\t`}sum</div>
                                                    <button
                                                      onClick={() => {
                                                      
                                                        if (!brandID || brandID === prod.brandID) {
                                                          setSelectedProduct(prod);
                                                          dispatch(showModalProduct());
                                                        } else {
                                                          dispatch(showModalExactBrand());
                                                        }
                                                      }}
                                                      className='w-[110px] main-bg text-[#fff] p-2 rounded-[10px]'>Add</button>
                                                  </div>
                                              }
                                            </div>

                         {/* MOBILE */}
                                            <div className='md:hidden block shadow-brand my-3 p-3 rounded-md'>
                                              <div className='flex h-[150px]'>
                                                <div className='pl-2 relative w-[50%]'>
                                                  <p className='text-[20px] font-semibold'>{prod.name.slice(0, 15)}</p> 
                                                  <p className='w-full text-slate-500 text-[12px]'>{prod.description.slice(0, 60)}</p>
                                                  <div className='font-bold text-[#F29314] absolute bottom-0 text-[20px]'>
                                                    {prod.price}{`\t`}sum
                                                  </div>
                                                </div>
                                                <div className='w-[50%] relative'>
                                                  <div className='relative'>
                                                    <img className='w-[180px] object-cover h-[99px] rounded-[10px]' src={`${url}/${prod.image}`} alt="" />
                                                    <img className='w-[50px] absolute top-1 right-1' src={`${url}/${brand.logo}`} alt="" />
                                                  </div>
                                                  { 
                                                    productID && productID.includes(prod._id) ?
                                                      orders &&
                                                      orders.map(order => order.id === prod._id &&
                                                        <div className='flex md:w-full w-[80%] mx-auto items-center justify-between md:mt-0 mt-[18px]'>
                                                          <div
                                                            onClick={() => {
                                                              if (order.quantity > 1) {
                                                                dispatch((removeItemFromCart(prod._id)))
                                                              }
                                                            }}
                                                            className='main-bg cursor-pointer md:w-[50px] md:h-[40px] w-[40px] h-[30px]  rounded-md
                                                                        flex justify-center items-center'><Minus /></div>
                                                          <div className='md:text-[30px] text-[25px]'>
                                                            <div>{order.quantity}</div> 
                                                          </div>
                                                          <div
                                                            onClick={() => dispatch(addItemToCart(prod))}
                                                            className='main-bg cursor-pointer md:w-[50px] md:h-[40px] w-[40px] h-[30px] 
                                                                       rounded-md flex justify-center items-center'><Plus /></div>
                                                        </div>
                
                                                      )
                                                      :
                                                      <button
                                                      onClick={() => {
                                                      
                                                        if (!brandID || brandID === prod.brandID) {
                                                          setSelectedProduct(prod);
                                                          dispatch(showModalProduct());
                                                        } else {
                                                          dispatch(showModalExactBrand());
                                                        }
                                                      }}
                                                        className='main-bg w-full mt-[20px] p-1 rounded-lg'>Add</button>
                                                  }

                                                </div>
                                              </div>
                                            </div>

                                          </>


                                        )
                                      }
                                    })
                                  ) : (
                                    <div>
                                      <Skeleton type='md:w-[380px] w-[350px] h-[200px] rounded-[10px]' />
                                      <Skeleton type='md:w-[380px] w-[350px] h-[200px] rounded-[10px]' />
                                      <Skeleton type='md:w-[380px] w-[350px] h-[200px] rounded-[10px]' />
                                      <Skeleton type='md:w-[380px] w-[350px] h-[200px] rounded-[10px]' />
                                    </div>
                                  )
                                }
                              </div>
                            )
                            :
                            <div className='container-product'>
                                      <Skeleton type=' h-[159px] rounded-[10px]' />
                                      <Skeleton type=' h-[159px] rounded-[10px]' />
                                      <Skeleton type=' h-[159px] rounded-[10px]' />
                                      <Skeleton type=' h-[159px] rounded-[10px]' />
                                      <Skeleton type=' h-[159px] rounded-[10px]' />
                            </div>
                          }
                        </div>
                      )
                    })
                    : <div>
                      <Skeleton type='md:w-[380px] w-[350px] h-[200px] rounded-[10px]' />
                    </div>
                }

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandStory