import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { showModalRegistration} from '../../store/slices/modalSlice';
import NavProfile from './NavProfile';
import { showProfile } from '../../store/slices/userSlice';


const NavMobile = ({ setIsOpen, isOpen }) => {

  const [search, setSearch] = useState()
  const [user, setUser] = useState()
  const [searchError, setSearchError] = useState(false)
  let currentUser;
  const navigate = useNavigate()

  async function getUser() {
    currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      setUser(currentUser.data.user)
    }
  }

    const getProfile = async () => {
      const token = localStorage.getItem("access_token")
      let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
      let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60));
      if (differenceInHours > 2 || !token) {
        dispatch(showModalRegistration()) 
        } else {
         dispatch(showProfile())
        }
    }

    const errorHandler = () => {
      if (search.length < 3) {
        setTimeout(() => {
          setSearchError(false)
        }, 3000)
      }
    }

  // const circleVariants = {
  //   hidden: {
  //     scale: 0,
  //   },
  //   visible: {
  //     scale: 180,
  //     transition: {
  //       type: 'spring',
  //       stiffness: 160,
  //       damping: 60,
  //     },
  //   },
  // };

  // const ulVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       delay: 0.1,
  //     },
  //   },
  // };

  const dispatch = useDispatch()
  const totalQuantity = useSelector(state => state.basket.totalQuantity)


  useEffect(() => {
    getUser()
  }, [])


  const currentPath = window.location.pathname;
  if (!currentPath.includes('/user/login') && !currentPath.includes('/admin')) {
    return (
      <>
        <div className='h-[140px] md:h-[60px] lg:hidden'>
          <div className={`lg:hidden ${'fixed top-0'} w-screen bg-white z-20 pb-[10px] border-b-[1px] border-[#F6F6FB] `}>
            <div className='w-[95%] mx-auto mt-4 mb-3 flex justify-between items-center'>

              <div onClick={() => setIsOpen(!isOpen)} className={`nav-toggle ${isOpen && 'open'}`}>
                <div className={`bar z-20`}>
                </div>
              </div>
              <a href="https://www.tezkor24.shop/"  className='flex justify-center items-center mr-[-20px] mt-[-6px] no-underline text-[#000]'>
                <div> <img className='w-[45px]'
                  src={require("../../assets/logomain.png")} alt="logo" /></div>
                <div className='font-bold mt-[3px] text-[20px]'>Tezkor 24</div>
              </a>

              <div onClick={(e) => {
                e.stopPropagation()
                getProfile()
              }}
              className='w-[65px] h-[35px] rounded-[15px] bg-[#F3F1EE] text-center text-[14px]
              flex justify-center items-center cursor-pointer'>
                Profile
              </div>
            </div>
            <div className='relative w-[95%] mx-auto flex justify-center'>
              {/* <div className='absolute top-[15.5px] left-[10px]'><Search className="mr-2" size={13}/></div> */}
              <div className='w-full flex items-center'>
                <div className='w-[75%]'>
                  <input
                
                   value={search} onChange={(e) => setSearch(e.target.value)} name='search' autoComplete='off' type="text" placeholder='Search food or restaurant'
                    className=" rounded-[12px] py-[10px] w-full px-[15px] border border-[#E4E4E7] outline-none " />
                </div>
                <div className='w-[25%]'>
                  <NavLink to={`/search/${search}`} className='no-underline cursor-pointer text-[#fff] w-full'>  
                  <div
                       onClick={() => errorHandler()}
                       disabled={!search || search.length < 3}
                    className='ml-2 py-[10px] px-[12px] text-[#fff] text-center cursor-pointer font-bold rounded-[12px] main-bg'>
                    Search  </div></NavLink>
                </div>

              </div>
              {/* {searchError &&  <div className='absolute left-[50px] top-[70px] bg-[red] p-2 text-[#fff] rounded-lg w-[270px] text-center'>Search text must be longer than 3</div>} */}

            </div>
          </div>

        </div>
        <NavProfile setUser={setUser} user={user} />
      </>
    )
  } else {
    return null
  }
}

export default NavMobile