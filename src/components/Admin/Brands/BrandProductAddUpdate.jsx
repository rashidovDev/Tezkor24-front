import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, Save, ShoppingBag, ArrowLeft } from 'react-feather';
import { DELETE, GET, POST, PUT } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import Modal from '../../Modal/Modal';
import { useForm } from "react-hook-form";

const BrandProductAdd = () => {
  const {id} = useParams()
  const [brand, setBrand] = useState('')

  const baseURL = process.env.REACT_APP_IMAGE;

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const navigate = useNavigate()
  const brandID = localStorage.getItem("brandID")

  const [page, setPage] = useState(0);
  const perPage = 6;

  async function getProduct(){
    const response = await GET('/product/' + id)
    		for (let key in response) {
			setValue(`${key}`, response[key])
		}
    // setImageUrl(response.image)
  }

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
  name : '',
  price : null,
  category : '',
  description : ''
  })

  async function getBrand() {
    const response = await GET(`/brand/` + brandID)
    setCategory(response.subcategory)
    setBrand(response)
  }

  async function createUser(data){
    let response
    if(id){
    response = await PUT(`/product/${id}`, data)
    }else{
      response = await POST(`/product/${brandID}`, data)
    }
    if (response) {
			navigate('/admin/brand/' + brandID)
		}
  }

 
  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  function getData(){
    getBrand()
    if(id){
    getProduct()
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
  getData()
  }, [page, search])

  return (
    <>
    

      <div className="background-white mx-3 box-shadow br-5 h-[800px]">
        <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
          <div className='relative'>
          <img className='w-[150px]' src={`${baseURL}${brand.image}`} alt="" />
          <img className='w-[30px] absolute top-1 right-1' src={`http://localhost:5500/${brand.logo}`} alt="" />
          </div>
     <span className='text-[25px] pl-[40px]'>{brand.name}</span>
        </div>
        <div className="px-3 pb-4 pt-2">
          <div className="mb-4 d-flex justify-content-between">
            <NavLink to={`/admin/brand/${brandID}`} className="no-underline">
              <button className=" flex items-center bg-[#FFEC00] p-2 rounded-md text-[#000]">
                <ArrowLeft size={18} className='mr-1' />
                <div className=''>Back</div>
              </button>
            </NavLink>
            <div className="relative">
              {/* <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
              <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' /> */}
            </div>
          </div>
          <div>
            <div>

            <div className=''>
            <form autoComplete='off' method="POST" className='flex justify-between' onSubmit={handleSubmit(createUser)} action="">
            <div className='mr-10'>

            <div className = "my-[40px]">
              <label htmlFor="name" className='w-[120px] ml-2'>Name</label>
              <input autoComplete="off" {...register("name", { required: true, minLength: 4 })} id='name' type="text" placeholder='Name' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#000]'/>
              {errors.username?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
            </div>

            <div className = "my-[40px]">
              <label htmlFor="login" className='w-[120px] ml-2'>Price</label>
              <input autoComplete="false" {...register("price", { required: true})} id='login' type="number" placeholder='Price' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#000]'/>
                {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
            </div>

            <div className = "my-[40px]">
              <label htmlFor="country" className='w-[120px] ml-2'>Category</label>
              <select {...register("category", { required: true})}  id="category" name="category" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'>
            {category && category.map( (cnt, idx) => {
              return(
                <option key={idx + 1} value={cnt}>{cnt}</option>
              )
            })}
        </select>
            </div> 


            <div className = "mt-[40px] flex items-center">
              <label htmlFor="description" className='w-[120px] ml-2'>Description</label>
              <textarea autoComplete="false" {...register("description", { required: true})} id='description' type="text" placeholder='Description' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#000]'/>
            </div>

          
            
            <div className='mt-[150px] flex justify-end text-[#000]  text-[19px]'>  
                <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] bg-[#FFEC00]'>
                <span className='mr-[5px] mt-[2px]'><Save size={16}/></span> <span>Save</span> 
                </button>
            </div>
            </div>
            <div className='ml-10'>
            </div>
            </form>
            
           
           
        </div>
            </div>
           
            

          </div>
        </div>
      </div>
    </>
  )
}

export default BrandProductAdd
