import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Instagram, Menu } from 'react-feather';
import { hideNavbar, showNavbar } from '../../store/slices/modalSlice';
import { NavLink } from 'react-router-dom';
import { BiLogoTelegram } from 'react-icons/bi';
import { FaLinkedin } from 'react-icons/fa';

const NavSidebar = ({setIsOpen, isOpen}) => {

  const dispatch = useDispatch()
  const isNavSideBarIsVisible = useSelector(state => state.modal.navbar)

 
  const circleVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 180,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 60,
      },
    },
  };

  const ulVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };
  return (
    <nav className='relative z-30 md:hidden block'>
    {/* circle */}
    {
      // isOpen &&
      
    }
   
    
    <motion.div
      variants={circleVariants}
      initial='hidden'
      animate={isOpen ? 'visible' : 'hidden'}
      className='w-4 h-4 rounded-full bg-[#F29314] fixed top-0 left-0'
    >
    </motion.div>

    <motion.div
      variants={ulVariants}
      initial='hidden'
      animate={isOpen ? 'visible' : ''}
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } fixed top-0 bottom-0 w-full flex flex-col justify-center 
      items-center transition-all duration-300 overflow-hidden mt-[-30px]`}
    >
       <div onClick={() => setIsOpen(!isOpen)} className={`nav-toggle1 ${isOpen && 'open1'}
      fixed top-[20px] left-[20px]`}>
         <div className={`bar1 z-20`}>
         </div>
         </div>
     
      
      {/* <div onClick={() => setIsOpen(false)} className={`nav-toggle absolute top-8 left-8`}>
        <div className="bar">
        </div>
        </div> */}
      
      <NavLink to={"/"} onClick={() => setIsOpen(false)} className='no-underline my-2 text-[20px] text-[#fff]'>Home</NavLink>
      <NavLink to={"/about"} onClick={() => setIsOpen(false)} className='no-underline my-2 text-[20px] text-[#fff]'>About Us</NavLink>
      <NavLink to={"/"} onClick={() => setIsOpen(false)} className='no-underline my-2 text-[20px] text-[#fff]'>Restaurants</NavLink>
      <NavLink to={"/"} onClick={() => setIsOpen(false)} className='no-underline my-2 text-[20px] text-[#fff]'>Back</NavLink>
      <div className='flex items-center absolute bottom-10'>
            <a ><Instagram className="mr-2" color='#fff' size={20} /></a>
            <a><BiLogoTelegram size={20} className='mr-1' color='#fff'/></a>
            <a className='px-2  pr-1 list-none'><FaLinkedin className='mr-1' size={20} color='#fff'/></a>
            <a className='no-underline text-[#fff] text-[20px]'>©2024 Tezkor24</a>
          </div>
      {/* <Socials /> */}
    </motion.div>
  </nav>
  )
}

export default NavSidebar