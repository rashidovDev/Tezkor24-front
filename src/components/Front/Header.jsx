import React, { useEffect, useState } from 'react'
import Brands from './Brands'
import Favourites from './Favourites'
import Modal from '../Modal/Modal'
import { X } from 'react-feather'
import { hideModal } from '../../store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import Filter from './Filter'
import Offers from './Offers'


const Header = () => {

  const [user, setUser] = useState('')
  const [category, setCategory] = useState('all')

  async function getUser() {
	  let	currentUser = JSON.parse(localStorage.getItem("user"))
    if(currentUser){
      setUser(currentUser.data.user)
    }
	}

  const dispatch = useDispatch()

  useEffect(() => {
  getUser()

  },[])
 
  return (
    <>
    <Modal>
      <div className='relative p-3 w-[300px] md:w-[350px]'>
      <p className='text-[25px]'>Order is succesfully completed 🎉</p>
      <p>Email sent <span className='font-semibold'>{user.email}</span>  email about your order information</p>
      <div onClick={() => dispatch(hideModal())} className='absolute top-0 right-0 cursor-pointer'><X/></div>
      </div>
    </Modal>
    <div className='lg:w-[90%] w-[95%] mx-auto md:mt-5 ' >
    <Favourites/>
    
    <Offers/>
    <Filter setCategory={setCategory} category={category}/>
    <Brands category={category}/>
    </div>
    </>
  )
}

export default Header