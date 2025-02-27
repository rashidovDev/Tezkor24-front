import React, { useState, lazy, Suspense } from 'react'
import ProfileDashboard from './ProfileDashboard'
import Activity from './Activity'
import { NavLink } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import Offers from './Offers'

const ProfileMain = lazy(() => import("./ProfileCategories/ProfileMain"));
const Purchases = lazy(() => import("../Purchases"));
const SavedRestaurants = lazy(() => import("./ProfileCategories/FavouriteBrands"));
const FavouriteFoods = lazy(() => import("./ProfileCategories/FavouriteFoods"));
const Notification = lazy(() => import("./ProfileCategories/Notification"));
const Reviews = lazy(() => import("./ProfileCategories/Reviews"));
const Settings = lazy(() => import("./ProfileCategories/Settings"));

const Profile = () => {
  const [selectedCategory, setSelectedCategory] = useState('Profile')

  const categories = ['Profile', 'Orders', 'Saved Restaurants', 'Notification', 'Reviews', 'Settings']

  const user = JSON.parse(localStorage.getItem('user'))

    const renderComponent = () => {
      switch (selectedCategory) {
        case "Profile":
          return <ProfileMain />;
        case "Orders":
          return <Purchases />;
        case "Saved Restaurants":
          return <SavedRestaurants />;
        case "Favourite foods":
          return <FavouriteFoods />;
        case "Notification":
          return <Notification />;
        case "Reviews":
          return <Reviews />;
        case "Settings":
          return <Settings />;
        default:
          return <div>Select a category</div>;
      }
    };


  return (
    <div className='md:w-[90%] mt-3 mx-auto'>
          <NavLink to="/" className="no-underline   ">
              <button className='flex justify-start items-center  text-[#8E8E93]'><ChevronLeft size={17} /> <span className='mb-[1px]'>Back</span></button>
            </NavLink>
      <div className='flex py-3 main' >
     
       <div className='w-[15%]'>
        <ProfileDashboard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
       </div>

       <div className='w-[65%]'>
        <div>
        <div><Activity/></div> 
        <div className='pt-2'>
        <div className='text-[28px] font-bold'>{selectedCategory}</div>
        <Suspense fallback={<div>Loading...</div>}>
        {renderComponent()}
        </Suspense>
        </div>
        </div>
       </div>

       <div className='w-[15%] md:block hidden'>
        <Offers />
       </div>
    </div>
    </div>
  )
}

export default Profile