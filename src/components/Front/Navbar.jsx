import React, { useEffect, useState } from 'react'
import { Globe, Navigation, Search, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from '../../store/slices/userSlice';
import { showModalRegistration } from '../../store/slices/modalSlice';
import ModalRegistration from '../Modal/ModalRegistration';
import { showDeliver, showLanguage } from '../../store/slices/toggleSlice';
import { motion } from "framer-motion"


const Navbar = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState()
  const [user, setUser] = useState()
  const [profile, setProfile] = useState(false)
  const [searchError, setSearchError] = useState(false)


  const languageIsVisible = useSelector(state => state.toggle.languageIsVisible)
  const deliverIsVisible = useSelector(state => state.toggle.deliverIsVisible)

  let currentUser;


  async function getUser() {
    currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      setUser(currentUser.data.user)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const dispatch = useDispatch()
  const errorHandler = () => {
    if (search.length < 3) {
      setSearchError(true)
      setTimeout(() => {
        setSearchError(false)
      }, 3000)
    }
  }

  const getProfile = async () => {
    const token = localStorage.getItem("access_token")
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
    if (differenceInHours > 2 || !token) {
      dispatch(showModalRegistration()) 
      } else {
        navigate("/profile")
      }
  }

  return (
    <>
      <ModalRegistration />
      <div className='md:h-[80px] mb-2'>
      <nav className='hidden md:block fixed z-20 w-screen bg-[#fff] top-0'>
        <div className='flex mx-[30px] items-center justify-between h-[80px] border-b-[1.5px] border-[#e7e7e7]'>

          {/* LEFT SIDE */}
          <div className='flex items-center'>
            <div className=''>
              <a href="https://tezkor24.vercel.app" className='flex items-center ml-2 no-underline'>
                <img className='w-[50px] h-[42px] ' src={require('../../assets/logomain.png')} alt='logo' />
                <h4 className='mb-[10px] font-bold text-[24px] pt-[14px] ml-1 text-[#000]'>Tezkor24</h4>
              </a>
            </div>
            

            <div className='lg:flex hidden relative items-center justify-between pt-1 ml-[35px]'>
              <div className='absolute bottom-[10px] left-[8px] text-[#777] '><Search className="" size={20} /></div>
              <div>
                <input value={search} onChange={(e) => setSearch(e.target.value)} name='search' autoComplete='off'
                  type="text" placeholder='Search for restaurants, foods, beverages...'
                  className=" border-[2px] border-[#F29314] w-[380px] outline-none
                  h-[42px] pl-[35px] pr-[25px] py-2 rounded-l-[15px]" />

                <NavLink to={`/search/${search}`} className='no-underline cursor-pointer text-[#fff]'>
                  <button
                    onClick={() => errorHandler()}
                    disabled={!search || search.length < 3}
                    className='w-[90px] h-[42px] main-bg rounded-r-[15px] text-center cursor-pointer'>Search</button>
                </NavLink>
              </div>
              <div onClick={(e) => {
                e.stopPropagation()
                dispatch(showDeliver())}} className='ml-5 relative '>
                <div className='absolute top-[9px] left-[18px]'><Navigation  width={18} color='white' /></div>
                <button
                  className='w-[240px] h-[42px] main-bg rounded-[15px] pl-3 '>Enter delivery address</button>
{
  deliverIsVisible &&
  <motion.div

  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ duration: 0.3 }}
     className='flex-col w-[350px] justify-center absolute top-[50px] 
    items-center shadow-carousel-language py-4 px-4 rounded-[15px] bg-white'>
      <div className=' text-[24px]
       text-center  py-2 my-2 '>We will provide location feature soon😊</div>
    </motion.div>
}
                  
              </div>

            </div>
          </div>



          {/* RIGHT SIDE */}
          <div className='flex items-center w-[170px] justify-between'>
            <div className='relative'>
              <div onClick={(e) =>{
              dispatch(showLanguage())
              e.stopPropagation()
              } } className='cursor-pointer justify-center items-center space-y-0 leading-none '>
              <span className='flex justify-center items-center font-bold'><Globe width={18}/></span>
              <span className='text-[14px]'>English</span>
              </div>
           {languageIsVisible && 
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
             className='flex-col w-[170px] justify-center absolute top-[50px] left-[-62px]
            items-center shadow-carousel-language py-2 px-4 rounded-[15px] bg-white'>
              <div className='border-b-[1px] border-[#EAEAEA] hover:text-[#999] cursor-pointer  py-2 my-2'>English</div>
              <div className='border-b-[1px] border-[#EAEAEA] hover:text-[#999] cursor-pointer py-2 my-2'>Русский</div>
              <div className='border-b-[1px] border-[#EAEAEA] hover:text-[#999] cursor-pointer py-2 my-2'>O'zbekcha</div>
              <div className='border-b-[1px] border-[#EAEAEA] hover:text-[#999] cursor-pointer py-2 my-2'> Kazakh</div>       
            </motion.div>
           }
           
            </div>

            <div onClick={getProfile} className='w-[90px] h-[42px] rounded-[15px] bg-[#EAEAEA] text-center 
            flex justify-center items-center cursor-pointer'>

           {user ? 'Profile' : 'Sign Up'}

            </div>
            {/* PROFILE */}
        
        
              {/* <div className='bg-[#fff] z-20 w-[250px] cursor-auto h-max text-[14px] absolute md:bottom-[-50px] top-[70px]  shadow p-3 rounded-[10px]'>
                <div>
                  <div className='flex items-center text-[16px]'><span className='text-[16px]'>Hey</span>  <img className='w-[15px] ml-1' src={require('../../assets/waving-hand.png')} alt="" />
                  </div>  {'\n'} <span className='text-[14px] w-[150px] font-semibold'>{user.email}</span>
                </div>
                <div>
                  <div className='my-3'>
                    <NavLink to='/purchases' className='no-underline text-[#000]'>
                      <div onClick={() => setProfile(false)} className='w-full text-[#000]  text-center hover:opacity-70 bg-[#F6F6FB] p-1 rounded-[5px] cursor-pointer my-1'>Purchases</div></NavLink>
                    <NavLink to='/favourite' className='no-underline text-[#000]'>
                      <div onClick={() => setProfile(false)} className='w-full text-[#000]  text-center hover:opacity-70 bg-[#F6F6FB] p-1 rounded-[5px] cursor-pointer my-1'>Favourite Restaurants</div></NavLink>
                    {/* <NavLink to='/favourite' className='no-underline text-[#000]'> 
                <div onClick={() => setProfile(false)} className='w-full text-[#000]  text-center hover:opacity-70 bg-[#F6F6FB] p-1 rounded-[5px] cursor-pointer my-1'>Notification</div></NavLink> 
                  </div>
                  <button onClick={() => logout()} className='main-bg w-full rounded-md text-[#fff] p-[2px] mt-2'>Logout</button>
                </div>
              </div> */}
          
           
           
          </div>

        </div>

      </nav>
      </div>
     

    </>
  )
}


export default Navbar