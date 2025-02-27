import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { hideProfile, logoutUser, showProfile } from '../../store/slices/userSlice';
import { X } from 'react-feather';

const NavProfile = ({setUser, user}) => {
  const isProfile = useSelector(state => state.user.profile)
  const basketIsVisible = useSelector(state => state.basket.navBasketIsVisible)
  let currentUser;
  async function getUser() {
		currentUser = JSON.parse(localStorage.getItem("user"))
    if(currentUser){
      setUser(currentUser.data.user)
    }
	}
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function logout(){
		dispatch(logoutUser())
    dispatch(hideProfile())
    setUser('')
		navigate("/")
	}

  useEffect(() => {
    getUser()
	},[])

  return (
    <div  className={`md:hidden block fixed top-0 main-bg right-0 bg-[#fff] w-[200px] 
    ${!isProfile ? 'profile-margin' : 'profile-true-margin'}
    rounded-bl-[30px] shadow-brand z-30 px-3 py-4`}>
      <div>
      <div onClick={() => dispatch(showProfile())} className='flex justify-end items-center pb-2'><X size={25}/></div>
      <div>
               <div className='flex items-center '><span className='text-[18px]'>Hey</span> 
               <img className='w-[15px] ml-1' src={require('../../assets/waving-hand.png')} alt="" />
               </div>  {'\n'} <span className='text-[10px] font-bold'>{user?.email}</span> 
      </div> 
      <div>
                <div className='my-3'>
                <NavLink
                onClick={() => dispatch(hideProfile())} to='/purchases' className='no-underline text-[#000]'> <div 
                className='w-full text-[#fff] text-[15px]  text-center hover:opacity-70 mb-1
                 rounded-[5px] cursor-pointer '>My orders</div></NavLink>
                    <NavLink
                onClick={() => dispatch(hideProfile())} to='/favourite' className='no-underline text-[#000]'> <div 
                className='w-full text-[#fff] text-[15px]  text-center hover:opacity-70 
                 rounded-[5px] cursor-pointer '>Favourite restaurants</div></NavLink>
                </div>
                <button onClick={() => logout()} className='w-full 
                rounded-md bg-[#fff] text-[#F29314] p-[2px] mt-2'>Logout</button>
              </div>
      </div>
    </div>
  )
}

export default NavProfile