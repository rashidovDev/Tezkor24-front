import React from 'react'
import { Instagram } from 'react-feather'
import { BiLogoTelegram } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  
    return (
      <footer className='bg-[#EAEAEA] block mt-5'>
        <div className='lg:w-[90%] w-[95%] mx-auto pt-[30px] text-[#848484]'>
         <div className='flex items-center  m-auto md:justify-start justify-between'>
          <p className='pr-8 text-[15px]'>About us</p>
          <p className='pr-8 text-[15px]'>Contacts</p>
          <p className='pr-8 text-[15px]'>Terms of use</p>
         </div>
         <div className='md:py-4 py-2 flex justify-between items-center'>
          <div className='md:mt-2'>
            <p className='hidden md:block'>Support Service: +82 10 7538 2787</p>
            <p className='md:hidden text-center'>©2023 Tezkor24 All rights reserved</p>
          </div>
          <div className='hidden md:flex items-center'>
            <a><Instagram className="mr-2" size={16} /></a>
            <a><BiLogoTelegram/></a>
            <a className='px-2 pr-1 list-none'><FaLinkedin/></a>
            <a>©2024 Tezkor24</a>
          </div>
         </div>
        </div>
      </footer>
    )
}

export default Footer