import React from 'react'
import { ShoppingCart } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { showNavBasket } from '../../store/slices/basketSlice'
import { motion } from "framer-motion"

const Box = () => {
    const dispatch = useDispatch()
    const totalQuantity = useSelector(state => state.basket.totalQuantity)
    const totalPrice = useSelector(state => state.basket.totalAmount)


      return (
        <>
        {totalQuantity > 0 && 
        <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => dispatch(showNavBasket())}
         className='block md:hidden fixed bottom-[150px] right-[25px]  main-bg z-20  rounded-[15px] p-2'>
            <div className='flex flex-col p-2'>
            <div className='flex items-center justify-between'>
                <div><ShoppingCart size={20}/></div>
                <div>{totalQuantity}{'\t'} pcs</div>
            </div>
            <div className='w-full justify-center flex items-center
             bg-[#fff] p-[10px] mt-3 rounded-lg text-[#F29314]'>
            {totalPrice} {'\t'} sum
            </div>
            </div>
        </motion.button>
        }
        </>
      )
}

export default Box