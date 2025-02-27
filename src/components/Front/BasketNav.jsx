import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, deleteBrandID, deleteItem, hideBasket, hideNavBasket, removeItemFromCart } from '../../store/slices/basketSlice'
import { Minus, Plus, ShoppingBag, Trash } from 'react-feather'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { showModalRegistration } from '../../store/slices/modalSlice'
import { checkToken } from '../../api/frontApi'


const BasketNav = () => {

    const totalPrice = useSelector(state => state.basket.totalAmount)
      const totalQuantity = useSelector(state => state.basket.totalQuantity)
    const basketIsVisible = useSelector(state => state.basket.navBasketIsVisible)
    const orders = useSelector(state => state.basket.items)
    const url = process.env.REACT_APP_IMAGE;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
  const order = () => {
    checkToken()
    const token = localStorage.getItem("access_token")
    if(!token){
      dispatch(showModalRegistration()) 
    }else{
        dispatch(hideNavBasket()) 
      navigate("/order")
    }
  }
    
    return (
        <div className={`md:hidden block fixed bottom-0 bg-[#fff] h-[600px] 
        ${basketIsVisible ? 'basket-bottom-true-margin' : 'basket-bottom-margin '}
        rounded-t-[30px] shadow-brand w-full z-30 px-3 py-4 `}>
            <button 
            onClick={() => dispatch(hideNavBasket())}
             className='absolute top-1 w-[90%] m-auto flex flex-col justify-center items-center'>
                <div className='w-[60px] bg-slate-300 h-[5px] my-1 rounded-lg'></div>
                <div className='w-[50px] bg-slate-300 h-[5px] rounded-lg'></div>
            </button>
            
            <div className='overflow-auto h-[500px]'>
            {
                orders.length > 0 ? 
                orders.map((order, idx) => {
                    return (
                        <div key={idx + 1} className=' flex items-center justify-between border-b-2 border-slate-100 mt-3'>
                        <div className='flex items-center  w-[50%] '>
                            <div className='mt-[-10px] w-[40%]'>
                            <div className='w-full '>
                            <img className='h-[43px] object-cover rounded-md ' 
                                src={`${url}/${order.image}`} alt="order-image" />
                            </div>
                               
                                </div>
                            <div className=' w-[60%]'>
                                <p className='font-bold text-[14px]'>{order.name}</p>
                                <p className='text-slate-500 text-[12px]'>{order.price}{'\t'}sum</p>
                            </div>
                        </div>
        
                        <div className='w-[50%] mt-[-20px]  flex justify-between items-center  '>
                            
                            <div className='font-medium flex items-center justify-between w-[50%]'>
                                <div
                                    className=' flex justify-center items-center cursor-pointer 
                                       relative w-[25px] h-[25px] text-center rounded-[10px] main-bg text-[#000]'>
                                    <button
                                        onClick={() => {
                                            if(totalQuantity == 1){
                                              dispatch(deleteBrandID())
                                              }
                                        dispatch(removeItemFromCart(order.id))
                                        } }
                                        className='text-[30px]'><Minus size={12} /></button>
                                </div>

                                <div className=' text-[16px]'>{order.quantity}</div>
                                <div
                                    onClick={() => dispatch(addItemToCart(order))}
                                    className=' flex justify-center items-center cursor-pointer relative w-[25px] h-[25px] 
                                    text-center rounded-[10px] main-bg text-[#000]'>
                                    <button className='text-[30px]'><Plus size={12}/></button>
                                </div>
                            </div>
        
                            <div className='flex flex-col justify-center  ml-[5px] w-[50%]'>
                            <div><div  className='text-slate-500 flex justify-center text-[13px] w-[100px]'>{order.totalPrice}{'\t'} sum</div> </div>
                            <div className='flex justify-center'>
                            <button 
                            onClick={() => {
                                if(orders.length == 1){
                                dispatch(deleteBrandID())
                                  }
                                dispatch(deleteItem(order.id))
                            } }
                             className=' '><FaTrash size={18} color='#F29314'/></button>
                            </div>
                            
                            </div>
                        </div>
        
                       
                    </div>
                    )
                })
                :
                <div className='flex flex-col mt-[150px] justify-center items-center'>
                <div className='text-[30px] text-[#000]'>Basket is empty</div>
                <div ><ShoppingBag className='text-[#F29314] mt-[30px]' size={72}/></div>
               </div>
            }
            </div>
           
           
            <button
               onClick={() => order()}
               disabled={orders.length < 1}
             className='absolute bottom-[25px] w-[90%] ml-1 mt-3 main-bg rounded-[15px] p-[8px]' >
            <div className='w-[80%] mx-auto flex justify-between items-center'>
            <div className='text-[20px] font-semibold'>Order</div>
            <div className='text-[18px] font-semibold' > {totalPrice}{`\t`}sum</div>
            </div>
            </button>

        </div>
    )
}

export default BasketNav