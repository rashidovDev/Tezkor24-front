import React, { useEffect, useState } from 'react'
import { DELETEFILE, FILE, GET, POST, PUT } from '../../../api/adminApi'
import {XCircle, Save, Edit, User} from 'react-feather';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import { getId } from '../../../store/slices/idSlice';

const ProductAddUpdate = () => {
  const {id} = useParams()
  const [file, setFile] = useState(null)

  const navigate = useNavigate()
  const userId = useSelector(state => state.id.id?.payload)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
         name : '',
         brand  : '',
         image : {},
         description : '',
         category : '',
         price : '',
         countInStock : 1,
  });

  const [category, setCategory] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  async function getCategories() {
      const response = await GET('/product/categories')
      setCategory(response)
  }

  async function createUser(data){
    let response
    if(id){
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('image', file)
      formData.append('description', data.description)
      formData.append('brand', data.brand)
      formData.append('price', data.price)
      formData.append('category', data.category)
      formData.append('countInStock', data.countInStock)
      response = await PUT("/product/" + id, formData)
    }else{
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('image', file)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('countInStock', data.countInStock)
    response = await POST("/product", formData)
    }
    if (response) {
			navigate('/admin/product')
		}
  }

  async function getUser(){
    const response = await GET('/product/' + id)
    		for (let key in response) {
			setValue(`${key}`, response[key])
		}
    setImageUrl(response.image)
  }

  async function fileUpload(){
      const formData = new FormData()
	   	formData.append('file', file)
      await FILE(`/auth/avatar/${id ? id : userId}`, file)
      navigate("/admin/user")
      dispatch(hideModal())
  }

  async function getData() {
    await getCategories()
    if(id){
      await getUser()
    }
  }

  useEffect(() => {
      getData()
  },[])

  return (
    <>
    <div className='h-[630px] px-16 relative'>       
      <div className='flex items-center h-[600px]'>
        <div className=''>
            <form autoComplete='off' method="POST" className='flex justify-between' onSubmit={handleSubmit(createUser)} action="">
            <div className='mr-10'>
            <div className = "my-[40px]">
              <label htmlFor="name" className='w-[120px] ml-2'>Product Name</label>
              <input autoComplete="off" {...register("name", { required: true, minLength: 4 })} id='name' type="text" placeholder='Product name' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
              {errors.username?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
              {errors.username?.type === 'minLength' && <div className='text-danger mt-2'>Поле должно быть не менее 4 символов</div>}
            </div>
            <div className = "my-[40px]">
              <label htmlFor="name" className='w-[120px] ml-2'>Product Image</label>
              <input autoComplete="off" {...register("image", { minLength: 4 })} id='image' 
              onChange={(e) => setFile(e.target.files[0])} 
              type="file" accept=".jpg,.jpeg,.png"  placeholder='Product image' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
              {/* {errors.username?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
              {errors.username?.type === 'minLength' && <div className='text-danger mt-2'>Поле должно быть не менее 4 символов</div>} */}
            </div>
            <div className = "my-[40px]">
              <label htmlFor="brand" className='w-[120px] ml-2'>Brand name</label>
              <input autoComplete="false" {...register("brand", { required: true})} id='brand' type="text" placeholder='Brand name' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
                {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
              </div>
            <div className = "my-[40px]">
              <label htmlFor="price" className='w-[120px] ml-2'>Product price</label>
              <input autoComplete="false" {...register("price", { required: true})} id='price' type="text" placeholder='Product price' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
            </div>
            <div className = "my-[40px]">
              <label htmlFor="count" className='w-[120px] ml-2'>Product count</label>
              <input autoComplete="false" {...register("countInStock", { required: true})} id='count' type="number" placeholder='Product price' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
            </div>
            <div className = "my-[40px]">
              <label htmlFor="country" className='w-[120px] ml-2'>Category</label>
              <select {...register("category", { required: true})}  id="category" name="category" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'>
            {category.map( (cnt, idx) => {
              return(
                <option key={idx + 1} value={cnt.name}>{cnt.name}</option>
              )
            })}
        </select>
            </div> 
            <div className='absolute bottom-10 md:right-[135px] flex text-[#fff]  text-[19px]'>  
                <Link to="/admin/product" className='no-underline text-[#fff]'>
                <button className='mr-5 p-[6px] underline-none w-[130px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                <span className='mr-[5px] mt-[2px]'><XCircle size={16}/></span> <span>Cancel</span> 
                </button>
                </Link>
                <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] bg-[#5C3EBA]'>
                <span className='mr-[5px] mt-[2px]'><Save size={16}/></span> <span>Save</span> 
                </button>
            </div>
            </div>
            <div className='ml-10'>
            <div className = "my-[40px]">
              <label htmlFor="password" className='w-[120px] ml-2'>Description</label>
              <textarea autoComplete="false" {...register("description", { required: true})} id='name' type="text" placeholder='Description' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
            </div>
            </div>
            </form>
            {
              id &&   <img className='w-[200px] absolute right-[350px] object-cover bottom-[150px]'src={`http://localhost:5000/${imageUrl}`} alt="" />
            }
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductAddUpdate
