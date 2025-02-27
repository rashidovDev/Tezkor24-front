import React, { useEffect, useState } from 'react'
import { DELETEFILE, FILE, GET, POST, PUT, login } from '../../api/frontApi'
import { XCircle, Save, Edit, User } from 'react-feather';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, showModal } from '../../store/slices/modalSlice';
import { FaUserCircle } from 'react-icons/fa';

const Registration = () => {
  const { id } = useParams()
  const [user, setUser] = useState()
  const [file, setFile] = useState(null)

  const navigate = useNavigate()
  const userId = useSelector(state => state.id.id?.payload)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    username: '',
    email: '',
    password: '',
    country: '',
    region : ''
  });
  const baseURL = "http://localhost:5000/api"
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('Afghanistan')
  const [imageUrl, setImageUrl] = useState('')

  const authLogin = async (email, password) => {
    try{
     const response = await login(email, password) 
     if(response){
          const data = await axios.get(baseURL + '/auth',
          { headers: { Authorization: 'Bearer ' + response.data.token }})
      
          for (let i = 0; i < data.data.user.roles.length; i++) {
              if (data.data.user.roles[i] === "admin" || data.data.user.roles[i] === "owner") {
                  localStorage.setItem('admin_access_token', response.data.token)
                  localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()))
                  localStorage.setItem('admin_user', JSON.stringify(data))
                  navigate("/admin/main")
              }else if(data.data.user.roles[i] === "user" && 
              !data.data.user.roles[i] === "admin" && !data.data.user.roles[i] === "owner"){
                  localStorage.setItem('user_token', response.data.token)
                  localStorage.setItem("user_tokenTime", JSON.stringify(new Date().getTime()))
                  localStorage.setItem('user', JSON.stringify(data))
                 navigate("/")
              }else {
                 navigate("/")
              }
          }  
     }
    }catch(err){
    alert(err.data.data.message)
    }
 }
  
  async function getCountries() {
    const response = await GET('/country-helper')
    setCountry(response)
    getRegions()
  }

  async function getRegions() {
    if(selectedCountry){}
    const response = await GET(`/region-helper?country=${selectedCountry}`)
    setRegion(response)
  }

  async function getUser(){
    const currentUser = JSON.parse(localStorage.getItem("admin_user"))
      setUser(currentUser.data.user)
  }

  async function getUser() {
    const response = await GET('/auth/users/' + id)
    for (let key in response) {
      setValue(`${key}`, response[key])
    }
    setImageUrl(response.avatar)
  }


  async function createUser(data) {
    let response
    if (id) {
      response = await PUT("/auth/users/" + id, data)
    } else {
      response = await POST("/auth/registration", data)
      await authLogin(data.email, data.password)
    }
    if (response) {
      navigate('/')
    }
  }

  async function fileUpload() {
    await FILE(`/auth/avatar/${id}`, file)
    navigate("/admin/user")
    dispatch(hideModal())
  }

  async function deleteFile() {
    await DELETEFILE(`/auth/avatar/${id ? id : userId}`, file)
    navigate("/admin/user")
    // dispatch(hideModal())
  }

  async function getData() {
    getCountries()
    getRegions()
    if (id) {
      await getUser()
    }
      
  }

  useEffect(() => {
    getData()
  }, [selectedCountry])

  return (
    <>
      {/* //Modal */}
      <Modal>
        <div className='p-3'>
          <p className='text-center'>Upload picture</p>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" accept=".jpg,.jpeg,.png" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
          <button className='p-[8px] ml-4 rounded-[6px] text-[#fff] bg-[#5C3EBA]' onClick={fileUpload}>upload</button>
        </div>
      </Modal>

      <div className='text-[#262134] w-full min-h-screen flex relative'> 
      <div className='w-1/2 bg-[#5C3EBA] flex items-center justify-center text-[#fff] text-[60px]'>
            TECH SHOP   
      </div>
     <div>
     <div className='flex items-center h-[600px]'>
          <div className='w-1/2 ml-16'>
            <div>
              <form autoComplete='off' method="POST" onSubmit={handleSubmit(createUser)} action="">
                <div className="my-[40px]">
                  <label htmlFor="username" className='w-[70px] ml-2'>Username</label>
                  <input autoComplete="off" {...register("username", { required: true, minLength: 4 })} id='username' type="text" placeholder='Username'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.username?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
                  {errors.username?.type === 'minLength' && <div className='text-danger mt-2'>Поле должно быть не менее 4 символов</div>}
                </div>
                <div className="my-[40px]">
                  <label htmlFor="email" className='w-[70px] ml-2'>Email</label>
                  <input autoComplete="false" {...register("email", { required: true })} id='email' type="text" placeholder='Email'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.email?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
                </div>
                <div className="my-[40px]">
                  <label htmlFor="password" className='w-[70px] ml-2'>Password</label>
                  <input autoComplete="false" {...register("password", { required: true })} id='password' type="text" placeholder='Name'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                      {errors.email?.type === 'required' && <div className='text-danger mt-2'>Required field</div>}
                </div>
                {country && (
                
                   <div className="my-[40px]">
                    <label htmlFor="country" className='w-[70px] ml-2'>Country</label>
                    <select  {...register("country", { required: true })} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                     id="country" name="country" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'>
                      {country.map((cnt, idx) => {
                        return (
                          <option key={idx + 1} value={cnt.countryName}>{cnt.countryName}</option>
                        )
                      })}
                    </select>
                  </div>
                  )}
                  
                   { region && <div className="my-[40px]">
                    <label htmlFor="region" className='w-[70px] ml-2'>Region</label>
                    <select  {...register("region", { required: true })} 
                     id="region" name="region" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'>
                      {region.regions.map((cnt, idx) => {
                        return (
                          <option key={idx + 1} value={cnt.name}>{cnt.name}</option>
                        )
                      })}
                    </select>
                  </div> } 
                <div className='absolute bottom-10 md:right-[80px] flex text-[#fff]  text-[19px]'>
                  <Link to="/" className='no-underline text-[#fff]'>
                    <button className='mr-5 p-[6px] underline-none w-[130px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                      <span className='mr-[5px] mt-[2px]'><XCircle size={16} /></span> <span>Cancel</span>
                    </button>
                  </Link>
                  <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] bg-[#5C3EBA]'>
                    <span className='mr-[5px] mt-[2px]'><Save size={16} /></span> <span>Save</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='w-1/2'>
              {id && (

              <div className='md:ml-16 mb-2 flex-column'>
              {imageUrl ?
                <img className='rounded-full w-[250px] h-[250px] object-cover mb-3' src={`http://localhost:5000/${imageUrl}`} alt="" />
                : <FaUserCircle className='text-[170px] ml-[35px] my-2' />
              }
              <div className=''>
                <button
                  onClick={() => {
                    dispatch(showModal())
                  }}
                  className='p-[4px] w-[130px] md:ml-[58px] text-[#5C3EBA] border-1 mt-3 border-[#5C3EBA] flex items-center text-center justify-center rounded-[6px] bg-[#fff]'>
                  <span className='mr-[5px] '><Edit size={16} /></span> <span>{imageUrl ? "Edit picture" : "Add picture"} </span>
                </button>
                {
                  imageUrl && <button
                    onClick={deleteFile}
                    className='p-[4px] w-[130px]  md:ml-[58px] text-[red] border-1 mt-2 border-[red] flex items-center text-center justify-center rounded-[6px] bg-[#fff]'>
                    <span className='mr-[5px] '><Edit size={16} /></span> <span>Delete picture</span>
                  </button>
                }

              </div>
            </div>
              )}
          
          </div>
        </div>
      </div>  
        
      </div>
    </>
  )
}

export default Registration
