import React from 'react'
import ModalRegistration from '../Modal/ModalRegistration'
import BrandStory from './BrandStory'
import ModalCustom from '../Modal/ModalCustom'

const BrandPro = () => {
  return (
    <div>
       <ModalCustom>
      <div className='text-[24px]
       text-center  p-4 my-2 '>You can place an order from only
        one restaurant at a time😊</div>
      </ModalCustom>
        <ModalRegistration/>
        <BrandStory />
    </div>
  )
}

export default BrandPro