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

const UserAddUpdate = () => {
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

  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('Afghanistan')
  const [imageUrl, setImageUrl] = useState('')
  
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
    }
    if (response) {
      navigate('/admin/user')
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
    if (id) {
      await getUser()
    }

  }

  useEffect(() => {
    getData()
    getCountries()
    getRegions()
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

      <div className='h-[630px] px-16 relative'>

        <div className='flex items-center h-[600px]'>
          <div className='w-1/2 ml-16'>
            <div>
              <form autoComplete='off' method="POST" onSubmit={handleSubmit(createUser)} action="">
                <div className="my-[40px]">
                  <label htmlFor="username" className='w-[70px] ml-2'>Username</label>
                  <input autoComplete="off" {...register("username", { required: true, minLength: 4 })} id='username' type="text" placeholder='Username'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.username?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
                  {errors.username?.type === 'minLength' && <div className='text-danger mt-2'>Поле должно быть не менее 4 символов</div>}
                </div>
                <div className="my-[40px]">
                  <label htmlFor="email" className='w-[70px] ml-2'>Email</label>
                  <input autoComplete="false" {...register("email", { required: true })} id='email' type="text" placeholder='Email'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
                  {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
                </div>
                <div className="my-[40px]">
                  <label htmlFor="password" className='w-[70px] ml-2'>Password</label>
                  <input autoComplete="false" {...register("password", { required: true })} id='password' type="text" placeholder='Name'
                    className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
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
                <div className='absolute bottom-10 md:left-[135px] flex text-[#fff]  text-[19px]'>
                  <Link to="/admin/user" className='no-underline text-[#fff]'>
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
    </>
  )
}

export default UserAddUpdate
