import React, { useEffect, useState } from 'react'
import {Delete, Trash2, Trash, ShoppingBag, Plus, Minus} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, deleteBrandID, deleteItem, hideBasket, removeItemFromCart, showBasket } from '../../store/slices/basketSlice'
import { showModal, showModalRegistration } from '../../store/slices/modalSlice'
import Modal from '../Modal/Modal'
import { NavLink, useNavigate } from 'react-router-dom'
import { checkToken } from '../../api/frontApi'


const Basket = () => {


  const basket = JSON.parse(localStorage.getItem("basket")) || []
  const basketIsVisible = useSelector(state => state.basket.basketIsVisible)
  const totalQuantity = useSelector(state => state.basket.totalQuantity)
  const totalPrice = useSelector(state => state.basket.totalAmount)

  const orders = useSelector(state => state.basket.items)
  const dispatch = useDispatch()
 const url = process.env.REACT_APP_IMAGE;
  const navigate = useNavigate()

  // async function getUser() {
  // const token = JSON.parse(localStorage.getItem("access_token"))


  const order = async () => {
    const token = localStorage.getItem("access_token")
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
    if (differenceInHours > 2 || !token) {
      dispatch(showModalRegistration()) 
      dispatch(hideBasket()) 
      } else {
        dispatch(hideBasket()) 
        navigate("/order")
      }
  }

  // useEffect(() => {
  // getUser()
  // },[])

  const currentPath = window.location.pathname;

  if (!currentPath.includes('/order') && !currentPath.includes('/admin')){
    return (
      <> 
     
      <div onClick={(e) => e.stopPropagation()} className={`${!basketIsVisible ? 'basket-left-margin' : 'basket-right-margin '}
       bg-[#fff] z-40 w-[450px] top-0 h-screen fixed right-0 shadow `}>
          <div onClick={(e) => {
         
          dispatch(showBasket())
          } } className='cursor-pointer flex justify-center items-center main-bg border-b-[1px] border-[#F6F6FB] h-[77px]'>
              <ShoppingBag />
              <h4 className='text-[#fff] pl-2 mt-2'>Shopping Cart</h4>
          </div>
          <div className=' overflow-auto md:h-[750px]'>
              {orders.length > 0 ? (
              orders.map((order, idx) => {
                  return (
                  <div
                   key={idx + 1} className='my-3 relative  mx-2 border-b-[2px] border-[#F6F6F6]'>
                  <div   className='flex items-center '>
                      <div className='w-[70px] flex justify-center items-center '><img className='h-[60px] w-full  object-cover rounded-md' src={`${url}${order.image}`} alt="basketPhoto" /></div> 
                      <div className='pl-[30px]'>
                         <div className='font-medium'></div>
                          <div className='font-medium flex items-center py-1 justify-center'>
                              <div 
                               className=' flex justify-center items-center cursor-pointer relative w-[30px] h-[30px] text-center rounded-[3px] bg-[#E7E7EA] text-[#000]'>
                                  <button
                                  onClick={() => {
                                    if(totalQuantity == 1){
                                      dispatch(deleteBrandID())
                                    }
                                    dispatch(removeItemFromCart(order.id))
                                  }}
                                   className='text-[30px]'><Minus /></button>
                              </div>
                              <div className='px-[20px] text-[20px]'>{order.quantity}</div>
                              <div 
                               onClick={() => dispatch(addItemToCart(order))}
                               className=' flex justify-center items-center cursor-pointer relative w-[30px] h-[30px] text-center rounded-[3px] bg-[#E7E7EA] text-[#000]'>
                                  <button className='text-[30px]'><Plus /></button>
                              </div>
                          </div>
                          <div className='text-center text-[#000] font-semibold'>{order.price} {'\t'}sum</div>
                      </div>
                  </div>
     
                  <div>
                   
                  </div>
                  <div
                  onClick={() => {
                    if(orders.length == 1){
                      dispatch(deleteBrandID())
                    }
                    dispatch(deleteItem(order.id))
                  }
                   }
                  className='absolute right-2 bottom-[15px] cursor-pointer'> <Trash2 size={20} className='mr-1'/></div>
                  <div className='font-medium text-[16px] text-[#000]  absolute right-2 top-[-15px]'>
                    <div> {order.name} </div>
                    {/* <div> {order.price*order.quantity} {'\t'}sum </div> */}
                  </div>

                 </div> 
                   )
              })
              ) : ( 
              <div className='flex flex-col mt-[150px] justify-center items-center'>
                  <div className='text-[30px] text-[#000]'>Basket is empty</div>
                  <div ><ShoppingBag className='text-[#F29314] mt-[30px]' size={72}/></div>
              </div>
              )} 
            
          </div>
          <button
          onClick={order}
          disabled={orders.length < 1} className='main-bg text-[#fff] absolute bottom-5 w-[400px] left-[27px]
          flex justify-between text-[20px] items-center py-3 px-5 rounded-[10px] font-semibold'>
                  <div>Order</div>
                  <div>{totalPrice}{'\t'}sum</div>
          </button>
      </div>
      </>
    )
  }else{
    return null
  }

  
}

export default Basket