import React, { useEffect, useState } from 'react'
import { DELETEFILE, FILE, GET, POST, PUT } from '../../../api/adminApi'
import { XCircle, Save, Edit, User } from 'react-feather';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import { getId } from '../../../store/slices/idSlice';
import { FaUserCircle } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { PGET } from '../../../api/frontApi';

const AdminAddUpdate = () => {
  const { id } = useParams()
  const [district, setDistrict] = useState('')
  let regionID = 14

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    email  : '',
    number : '',
    password : '',
    phoneNumber : ''
  });


  async function getUser() {
    const response = await GET('/auth/user/' + id)
    for (let key in response) {
      setValue(`${key}`, response[key])
    }
  }

  async function createUser(data) {
    let response
    if (id) {
      response = await PUT("/auth/" + id, data)
    } else {
      response = await POST("/auth/registration-admin", data)
    }
    if (response) {
      navigate('/admin/admin')
    }
  }

  async function getData() {
    if (id) {
      await getUser()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>

      <div className='h-[630px] px-16 relative '>

        <div className='h-[800px]'>
            <div>
              <form autoComplete='off' method="POST" onSubmit={handleSubmit(createUser)} action="">
                <div className='raw'>
                  
                <div className="my-[40px] w-[33%] float-left">
                  <label htmlFor="email" className='w-[150px] ml-2'>Email</label>
                  <input autoComplete="false" {...register("email", { required: true })} id='email' type="text" placeholder='Email'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
                </div>

                <div className="my-[40px] w-[33%] float-left">
                  <label htmlFor="email" className='w-[150px] ml-2'>Name</label>
                  <input autoComplete="false" {...register("name", { required: true })} id='email' type="text" placeholder='Name'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
                </div>

                <div className="my-[40px] w-[33%] float-left">
                  <label htmlFor="password" className='w-[150px] ml-2'>Password</label>
                  <input autoComplete="false" {...register("password", { required: true })} id='password' type="text" placeholder='Password'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                </div>

               <div className="my-[40px] w-[33%] float-left">
                  <label htmlFor="password" className='w-[150px] ml-2'>Phone Number</label>
                  <input autoComplete="false" {...register("phoneNumber", { required: true })} id='password' type="text" placeholder='Phone Number'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                </div>  
                </div>
                <div className='absolute bottom-0 md:right-[185px] flex text-[#fff]  text-[19px]'>
                  <Link to="/admin/user" className='no-underline text-[#fff]'>
                    <button className='mr-5 p-[6px] underline-none w-[130px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                      <span className='mr-[5px] mt-[2px]'><XCircle size={16} /></span> <span>Cancel</span>
                    </button>
                  </Link>
                  <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] main-bg'>
                    <span className='mr-[5px]  mt-[2px]'><Save size={16} /></span> <span>Save</span>
                  </button>
                </div>
              </form>
            </div>      
        </div>
      </div>
    </>
  )
}

export default AdminAddUpdate
