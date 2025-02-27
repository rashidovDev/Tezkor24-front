import React, { useState } from 'react'

const ProfileDashboard = (props) => {
 
  const categories = ['Profile', 'Orders', 'Saved Restaurants' ,'Favourite foods', 'Notification', 'Reviews', 'Settings']

  const chooseCategory = (category) => {
  props.setSelectedCategory(category)
  }
  
  return (
    <div>
    <div className='text-[24px] font-bold'>My Profile</div>
    <div className='mt-4'>
        {categories.map((category, index) => (
            <div key={index + 1} 
            onClick={() => chooseCategory(category)}
            className={`${props.selectedCategory === category && 'bg-[#EAEAEA]' } hover:bg-[#EAEAEA]
              w-[80%] my-3 px-3 py-2
            rounded-[10px] cursor-pointer`}>{category}</div>
        ))}
        
    </div>

    </div>
  )
}

export default ProfileDashboard