import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {hideModal, hideModalExactBrand} from "../../store/slices/modalSlice"
import { motion } from 'framer-motion'

const ModalCustom = (props) => {
  const dispatch = useDispatch()
    const modal = useSelector(state => state.modal.modalExactBrand) || false
  return (
    <div>
    {
          modal && (
            <div  onClick={() => dispatch(hideModalExactBrand())} className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
               <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} className='bg-[#fff] w-[80%] md:w-[450px]  z-20 rounded-[10px]  m-auto relative p-3 items-center justify-center flex'>
                {props.children}
                </motion.div>
                </div>
    
              )
            }
        </div>
  )
}

export default ModalCustom