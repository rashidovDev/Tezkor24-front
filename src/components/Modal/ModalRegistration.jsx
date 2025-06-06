import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {hideModalRegistration} from "../../store/slices/modalSlice"
import { useForm } from 'react-hook-form'
import { checkToken, login, SIGNUP } from '../../api/frontApi'
import { NavLink, useNavigate } from 'react-router-dom'
import { hideProfile } from '../../store/slices/userSlice'
import { Eye, EyeOff } from 'react-feather'
import { motion } from 'framer-motion'
import axios from 'axios'

const ModalRegistration = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const baseURL = process.env.REACT_APP_SERVER_API;

  const { register, handleSubmit, formState: { errors }} = useForm({
    email: '',
    password: ''
  });

  const modal = useSelector(state => state.modal.modalRegistration) || false


  async function createUser(data) {
    // await checkToken()
    const response = await SIGNUP('/auth/registration-user', data)
    console.log("response", response)
    if(response){
      const response = await login(data)
      if(response){  
        const data = await axios.get(baseURL + '/auth/user',
        { headers: { Authorization: 'Bearer ' + response.data.token}})
        for(let i = 0; i < data.data.user.roles.length; i++){
           if (data.data.user.roles[i] === "admin" || data.data.user.roles[i] === "owner") {
               localStorage.setItem('admin_access_token', response.data.token)
               localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()))
               localStorage.setItem('admin_user', JSON.stringify(data))
               navigate("/admin/main")
           }else if(data.data.user.role === "customer"){
              localStorage.setItem('access_token', response.data.token)
              localStorage.setItem("user_tokenTime", JSON.stringify(new Date().getTime()))
              localStorage.setItem('user', JSON.stringify(data))
              navigate("/")
              window.location.reload()
           }
           else{
              navigate("/")
         
           } 
        }         
   }
      dispatch(hideModalRegistration())
      dispatch(hideProfile())
    }
  }

  return (
    <>
    
    {
      modal && (
        <div  onClick={() => dispatch(hideModalRegistration())} className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">

        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} className='bg-[#fff]  w-[80%] md:w-[400px] z-20 rounded-[10px]  m-auto relative p-3 items-center justify-center flex'>
        <div className='p-2'>
   <h4>Registration</h4>
   <form
    autoComplete='off' method="POST" onSubmit={handleSubmit(createUser)} action="">
             <div className="my-[20px]">
               <label htmlFor="username" className='w-[70px] ml-2'>Email</label>
               <input autoComplete="off" {...register("email", { required: true, minLength: 4 })} id='username' type="email" placeholder='Email'
                 className='border ml-1 border-sky-500 p-2 w-full outline-[#5C3EBA]' />
                 <div className='text-[12px] ml-1 text-slate-400'>Please provide valid email because we will send notification to your email about your order information</div>
               {errors.email?.type === 'required' && <div className='text-danger mt-2'>Required space</div>}
             </div>

             <div className="mt-[20px] mb-[30px] relative">
               <label htmlFor="password" className='w-[70px] ml-2'>Password</label>
               <input autoComplete="off" {...register("password", { required: true, minLength: 5 })} id='password' type={visible ? "text" : "password"} placeholder='Password'
                 className='border ml-1 border-sky-500 p-2 w-full outline-[#5C3EBA] ' />
                                         <div onClick={() => setVisible(!visible)} className='absolute right-2  md:bottom-[95px] top-[36px] cursor-pointer'>
                                           {visible ? <EyeOff className="mr-2" size={18} /> : <Eye className="mr-2" size={18} />} </div>
               {errors.password?.type === 'required' && <div className='text-danger mt-2'>Required space</div>}
               {errors.password?.type === 'minLength' && <div className='text-danger mt-2'>Password must be longer than 5 and shorter than 12</div>}
             </div>
             <div className='flex justify-end no-underline'>
             <button className='main-bg p-2 rounded-[10px] w-full text-center flex justify-center text-[#fff]'>Sign up</button>
             </div>
             <div className='flex items-center justify-center mt-[30px]'>
               <div className='mr-2'>Already have an account</div>
                <NavLink onClick={() => {
                 dispatch(hideModalRegistration())
                }} className='no-underline' to='/user/login'>Sign in</NavLink>
             </div>
   </form>  
   </div>
         </motion.div>
   </div>
      )
    }
    </>

     
  )
}

export default ModalRegistration