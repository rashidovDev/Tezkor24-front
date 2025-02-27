import React, { useEffect, useState } from 'react'
import { User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
const [user, setUser] = useState()


  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function getUser() {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      setUser(currentUser.data.user) 
    }
  }
  console.log("User", user)

  async function logout() {
    dispatch(logoutUser())
    setUser('')
    navigate("/")
  }

  useEffect(() => {
  getUser()
  },[])

  return (
    <div className='flex'>

    <div className='w-[30%] '>
     <div> <img src={require('../../../../assets/user.png')} alt="" /></div> 
     <div className='my-2'>

     <div className='font-bold text-[24px] text-center mt-1'>{user && user.email}</div>
     <div className='text-[#777] text-center'><span>Rankings:</span> <span>6/10</span></div>
     </div>
    </div>

    <div className='w-[70%] h-[350px] relative'>
   

    <div className='w-[80%] mx-auto relative'>
      <div className='w-full flex justify-between py-2 mb-3'>
        <span className='font-bold'>User ID</span>
        <span>{user && user.id}</span>
      </div>

      {/* <div className='w-full flex justify-between py-2 mb-3'>
        <span className='font-bold'>Name</span>
        <span>Anvar</span>
      </div> */}

      <div className='w-full flex justify-between py-2 mb-3'>
        <span className='font-bold'>Email</span>
        <span>{user && user.email}</span>
      </div>

      <div className='w-full flex justify-between py-2 mb-3'>
        <span className='font-bold'>Role</span>
        <span>{user && user.role}</span>
      </div>

      <div className='w-full flex justify-between  py-2 mb-3'>
        <span className='font-bold'>Phone</span>
        <span>+998 90 121 01 28</span>
      </div>
      
    </div>
    <button
    onClick={() => logout()}
     className='absolute main-bg py-2 px-3 
    rounded-[10px] bottom-0 right-[70px]'>
      Logout
    </button>
   
    </div>

    </div>
  )
}

export default Profile