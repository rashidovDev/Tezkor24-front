import React from 'react'
import * as motion from "motion/react-client"
import { useDispatch } from 'react-redux'

const Modal = (props) => {
  

  return (
    
    <div style={{ width : props.width}} >
    <motion.div
 initial={{ opacity: 0, y: -50 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -50 }}
 transition={{ duration: 0.3 }}
 onClick={(e) => e.stopPropagation()} className='bg-[#fff] p-2 z-20 rounded-[10px] shadow-sm  m-auto relative  items-center justify-center flex'>
     {props.children}
     </motion.div>
     </div>
           
       
  )
}

export default Modal