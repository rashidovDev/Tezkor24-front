import React, { useEffect, useState } from 'react'
import { DELETEFILE, FILE, GET, POST, PUT } from '../../../api/adminApi'
import { XCircle, Save, Edit, User, Image, Delete, X, Trash, PlusCircle, ShoppingBag, Plus, Home, Trash2, Edit2, Edit3, CheckCircle } from 'react-feather';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, hideModalDouble, showModal, showModalDouble } from '../../../store/slices/modalSlice';
import { getId } from '../../../store/slices/idSlice';
import { FaUserCircle } from 'react-icons/fa';
import ModalDouble from '../../Modal/ModalDouble';

const ProductAddUpdate = () => {
  const { id } = useParams()
  const [imageUrl, setImageUrl] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [file, setFile] = useState('')
  const [logo, setLogo] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brand, setBrand] = useState('')
  const [categoryItem, setCategoryItem] = useState('')
  let [category, setCategory] = useState([])

  const [inputTrue, setInputTrue] = useState(false)
  const [number, setNumber] = useState(4.7)
  console.log("N",number)


  const baseURL = process.env.REACT_APP_IMAGE

  const deliveryDiscounts = ["Free delivery", "No Free delivery"];

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    name: '',
    login: '',
    password: '',
    description: '',
    city: '',
    address: '',
    open: '',
    close: '',
    deliveryTime: '',
    deliveryFee: ''
  });

  async function getUser() {
    const response = await GET('/brand/' + id)
    for (let key in response) {
      setValue(`${key}`, response[key])
    }
    setBrand(response)
    setBrandName(response.name)
    setImageUrl(response.image)
    setLogoUrl(response.logo)
  }

  async function createUser(data) {
    let response
    if (id) {
      response = await PUT(`/brand/${id}`, data)
    }
    else {
      response = await POST("/brand", data)
    }
    if (response) {
      navigate('/admin/brand')
    }
  }

  async function getData() {
    if (id) {
      getUser()
    }
  }

  const dispatch = useDispatch()

  async function fileUpload() {
    await FILE(`/file/brand/${id}`, file)
    navigate("/admin/brand")
    dispatch(hideModal())
  }

  async function logoUpload() {
    await FILE(`/file/brandlogo/${id}`, logo)
    navigate("/admin/brand")
    dispatch(hideModalDouble())
  }

  async function deleteFile() {
    await DELETEFILE(`/file/brand/${id}`)
    navigate("/admin/brand")
    // dispatch(hideModal())
  }

  async function updateRating() {
    await PUT(`/brand/rating/${id}`, {number})
    getUser()
    // dispatch(hideModal())
  }

  async function updateDeliveryFee() {
    await PUT(`/brand/update-deliveryfee/${id}`)
    getUser()
    // dispatch(hideModal())
  }

  async function deleteLogo() {
    await DELETEFILE(`/file/brandlogo/${id}`)
    navigate("/admin/brand")
    // dispatch(hideModal())
  }

  // async function getCategory() {
  //   const response = await GET(`/category/category-list`)
  //   setBrandCat(response)
  // }


  useEffect(() => {
    getData()
    // getCategory()
  }, [])

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  return (
    <>

      <Modal>
        <div className='p-3'>
          <p className='text-center'>Upload picture</p>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" accept=".jpg,.jpeg,.png" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
          <button disabled={!file} className='p-[8px] ml-4 rounded-[6px] text-[#fff] bg-[#5C3EBA]' onClick={fileUpload}>Add image</button>
        </div>
      </Modal>

      <ModalDouble>
        <div className='p-3'>
          <p className='text-center'>Upload Logo</p>
          <input onChange={(e) => setLogo(e.target.files[0])} type="file" accept=".jpg,.jpeg,.png" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
          <button className='p-[8px] ml-4 rounded-[6px] text-[#fff] bg-[#5C3EBA]' onClick={logoUpload}>upload</button>
        </div>
      </ModalDouble>

      <div className=' min-h-screen p-3 relative  text-[12px]'>
        <div className="flex items-center my-3">
          <Home className='mr-2' color='#F29314' /> <span className='text-[25px]'>{id ? "Update brand" : "Create Brand"}</span>
        </div>

        <div className='flex '>
        <form autoComplete='off' method="POST" className={`${id ? 'container-update-from' : 'container-create-form'} `} onSubmit={handleSubmit(createUser)} action="">
          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Brand Name</label>
            <input autoComplete="off" {...register("name", { required: true })}
              id='name' type="text" placeholder='Brand name'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.name?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>

          {!id &&
            <>
              <div className="w-full flex justify-start items-center">
                <label htmlFor="login" className='w-[25%] flex justify-end'>Login</label>
                <input autoComplete="off" {...register("login", { required: true, minLength: 5 })}
                  id='login' type="text" placeholder='Login'
                  className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314] text-[12px]' />
                {errors.login?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
              </div>

              <div className="w-full flex justify-start items-center">
                <label htmlFor="password" className='w-[25%] flex justify-end'>Password</label>
                <input autoComplete="off" {...register("password", { required: true, minLength: 5 })}
                  id='password"' type="text" placeholder='Password'
                  className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
                {errors.password?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
              </div>
            </>
          }



          <div className="w-full flex justify-start items-center">
            <label htmlFor="city" className='w-[25%] flex justify-end'>City</label>
            <select autoComplete="off" {...register("city", { required: true })}
              id='city' type="text" placeholder='City'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 
              p-1 h-[30px] outline-[#F29314]  text-[12px]'>
             
              <option value="Tashkent">Tashkent</option>
            </select>
            {errors.city?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
            {/* <input autoComplete="off" {...register("city", { required: true })} 
              id='name' type="text" placeholder='City' 
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]'/> */}

          </div>

          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Address</label>
            <input autoComplete="off" {...register("address", { required: true })}
              id='address' type="text" placeholder='Address'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.adress?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>

          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Delivery time</label>
            <input autoComplete="off" {...register("deliveryTime", { required: true })}
              id='deliveryTime' type="text" placeholder="For example '20-30'"
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.deliveryTime?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>

          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[30%] flex justify-end'>Working hours</label>
            <input autoComplete="off" {...register("open", { required: true })}
              id='open' type="text" placeholder='10:00'
              className='placeholder:text-[12px] border w-[35%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.open?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}

            <input autoComplete="off" {...register("close", { required: true })}
              id='close' type="text" placeholder='23:00'
              className='placeholder:text-[12px] border w-[35%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.close?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>

          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Delivery Fee</label>
            <select autoComplete="off" {...register("deliveryFee", { required: true })}
              id='deliveryFee' type="text" placeholder='Delivery Fee'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 
              p-1 h-[30px] outline-[#F29314]  text-[12px]'>{
               
                deliveryDiscounts.map((item, idx) => {
                  return (
                    <option key={idx + 1} value={item}>{item}</option>
                  )
                })
              }
            </select>
            {errors.deliveryFee?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
            {/* <input autoComplete="off" {...register("city", { required: true })} 
              id='name' type="text" placeholder='City' 
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]'/> */}

          </div>

          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Discount</label>
            <input autoComplete="off" {...register("discount", { required: true })}
              id='discount' type="text" placeholder='33%'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.description?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>


          <div className="w-full flex justify-start items-center">
            <label htmlFor="name" className='w-[25%] flex justify-end'>Description</label>
            <textarea autoComplete="off" {...register("description", { required: true })}
              id='name' type="text" placeholder='Description'
              className='placeholder:text-[12px] border w-[75%] ml-1 border-sky-500 p-1 h-[30px] outline-[#F29314]  text-[12px]' />
            {errors.description?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
          </div>

          <div className='absolute bottom-10 md:left-[135px] flex text-[#fff]  text-[19px]'>
            <Link to="/admin/brand" className='no-underline text-[#fff]'>
              <button className='mr-5 p-[6px] underline-none w-[130px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                <span className='mr-[5px] mt-[2px]'><XCircle size={16} /></span> <span>Cancel</span>
              </button>
            </Link>
            <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] bg-[#5C3EBA]'>
              <span className='mr-[5px] mt-[2px]'><Save size={16} /></span> <span>Save</span>
            </button>
          </div>

        </form>

        {
          id &&  <div className='w-1/2 mt-[50px] h-['>
          <div className='w-[60%] mx-auto h-[250px] '>
          <img className=' h-[200px] w-full
            rounded-2xl object-cover' src={`${baseURL}/${imageUrl}`} alt="" />
            <div className='flex items-center justify-between'>
            <h4 className='font-bold my-2'>{brandName}</h4>
            <div 
            onClick={() => {
              if(imageUrl){
              deleteFile() 
              }else{
              dispatch(showModal())
              }
              
            }}
            className='flex items-center main-bg p-1 rounded-lg cursor-pointer'>
            
         
            <span className='mr-[5px] mt-[2px]'><Trash2 size={16} color={'#fff'} /></span> <span>{imageUrl ? "Delete image" : "Add image"}</span>
           
            </div>
           
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex'>
              <div className='flex items-center'>
              <img className='w-[40px] pr-[4px]' src={require("../../../assets/star+.png")} alt="" />
              <img className='w-[40px] pr-[4px]' src={require("../../../assets/star+.png")} alt="" />
              <img className='w-[40px] pr-[4px]' src={require("../../../assets/star+.png")} alt="" />
              <img className='w-[40px] pr-[4px]' src={require("../../../assets/star+.png")} alt="" />
              <img className='w-[40px] pr-[4px]' src={require("../../../assets/newstar.png")} alt="" />
              </div>
            
              <h1 className='text-[54px]'>{brand.rating}</h1>
              
              </div>
              <div 
            onClick={() => {
              
            }}
            className='flex items-center main-bg p-1 rounded-lg cursor-pointer'>
              {
                inputTrue ?
                <div className='flex w-[90px]'>
                <input value={number} onChange={(e) => setNumber(e.target.value)} name='search' autoComplete='off'
                  type="text" placeholder='4.9'
                  className=" border-[2px] border-[#F29314] text-[18px] 
                  w-[60%] text-center outline-none text-[#000]
                  h-[37px]  rounded-[10px]" />
  
                <div
                 onClick={() => {
                  updateRating()
                  setInputTrue(false)   
                }} className='no-underline cursor-pointer text-[#fff]'>
                  <button 
                    className='w-[40%] text-[16px] px-1 h-[37px] main-bg rounded-r-[15px] text-center'>Edit</button>
                </div>
              </div>
                :
                <div 
                onClick={() => {
                  setInputTrue(true)
                }}
                className='flex items-center main-bg p-1 rounded-lg cursor-pointer'>
                <span className='mr-[5px] mt-[2px] '><Edit3 size={16} color={'#fff'} /></span >
                <span className='text-[16px]'>Edit Rating </span>
                </div>
              }
            </div>   
           
            </div>   
            <div className=' pt-[5px] text-[#848484] w-full flex items-center justify-between'>
                              <div className='text-[#218A0A] w-[50%] bg-[#E7F2E4] px-[8px] py-2 
                              text-center rounded-[15px] text-[16px] '>{brand.deliveryFee ? "Free delivery" : "No Free delivery"}</div>
                               <div 
                onClick={() => {
                  setInputTrue(true)
                }}
                className='flex items-center bg-[]  p-1 rounded-lg cursor-pointer'>

                  {brand.deliveryFee ? 
                  <button onClick={() => updateDeliveryFee()} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}>
                  <XCircle color={'red'} size={16} /></button>

                : 
                <button onClick={() => updateDeliveryFee()} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}>
                  <CheckCircle color={'#218A0A'} size={16} /></button>
                }
                    
                 
                </div>
                            </div>   
          </div>
          </div>
        }

       


        </div>

      </div>
    </>
  )
}

export default ProductAddUpdate

// https://www.youtube.com/watch?v=jljy44ZQRg0