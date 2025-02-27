import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {hideModal} from "../../store/slices/modalSlice"
import { motion } from 'framer-motion'

const Modal = (props) => {
  const dispatch = useDispatch()
  const modal = useSelector(state => state.modal.modal) || false

  return (
    <div>
{
      modal && (
        <div  onClick={() => dispatch(hideModal())} className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
           <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} className='bg-[#fff]  z-20 rounded-[10px]  m-auto relative p-3 items-center justify-center flex'>
            {props.children}
            </motion.div>
            </div>

          )
        }
    </div>
  )
}

export default Modal