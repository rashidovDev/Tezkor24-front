import React, {  useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { NavigationProvider } from './utils/navigation'
import Home from './components/Admin/Home'
import Order from './components/Admin/Orders/Order'
import { AdminPrivateRoute, OwnerPrivateRoute } from './components/Admin/private'
import Admin from './components/Admin/Admins/Admin'
import AdminAddUpdate from './components/Admin/Admins/AdminAddUpdate'
import User from './components/Admin/Users/User'
import UserAddUpdate from './components/Admin/Users/UserAddUpdate'
import Product from "./components/Admin/Products/Product"
import Brand from "./components/Admin/Brands/Brand"
import BrandAddUpdate from "./components/Admin/Brands/BrandAddUpdate"
import ProductAddUpdate from "./components/Admin/Products/ProductAddUpdate"
import Customer from "./components/Admin/Customers/Customers"
import CustomerAddUpdate from "./components/Admin/Customers/CustomersAddUpdate"
import Login from "./Login"

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LineWave} from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Front/Navbar'
import Header from './components/Front/Header'
import About from './components/Front/About'
import BrandPro from './components/Front/BrandPro'


import Footer from './components/Front/Footer'
import Registration from './components/Front/Registration'
import Basket from './components/Front/Basket'
import Courier from './components/Admin/Couriers/Courier'
import CourierAddUpdate from './components/Admin/Couriers/CourierAddUpdate'
import BrandProduct from './components/Admin/Brands/BrandProduct'
import BrandProductAddUpdate from './components/Admin/Brands/BrandProductAddUpdate'
import { FavouriteBrandsPrivateRoute, OrderPrivateRoute, ProfilePrivateRoute, PurchasesPrivateRoute } from './components/Front/private'
import FavouriteFood from './components/Admin/Favourite/FavouriteFood'
import { hideBasket } from './store/slices/basketSlice'
import SearchBrand from './components/Front/SearchBrand'
import NavMobile from './components/Front/NavMobile'
import NavSidebar from './components/Front/NavSidebar'
import BasketNav from './components/Front/BasketNav'
import Box from './components/Front/Box'
import ShowNavbar from './components/Front/ShowNavbar'
import { hideDeliver, hideFilter, hideLanguage } from './store/slices/toggleSlice'
import Offer from './components/Admin/Offer/Offer'
import Category from './components/Admin/Category/Category'
import { hideProfile } from './store/slices/userSlice'

const App = () => {

  const [isOpen, setIsOpen] = useState(false)
  const loader = useSelector(state => state.loader.loader)
  const dispatch = useDispatch()

  return (
    <div 
    onClick={() => {
      dispatch(hideLanguage())
      dispatch(hideBasket())
      dispatch(hideFilter())
      dispatch(hideDeliver())
      dispatch(hideProfile())
    }} className='relative foot  wrapper'>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
      />
      {/* {loader &&
        <div className='loader z-30 fixed'>
          <Oval
            height={70}
            width={70}
            color="#F29314"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#F29314"
            strokeWidth={2} 
            strokeWidthSecondary={2}
          />
        </div>
      } */}

{loader &&
        <div className='loader z-30 fixed'>
         <LineWave
 height={100}
 width={100}
 color="#F29314"
 wrapperStyle={{}}
 wrapperClass=""
 visible={true}
  ariaLabel="line-wave-loading"
  secondaryColor="#F29314"
  strokeWidth={2} 
  strokeWidthSecondary={2}
   />
        </div>
      }

    
    <div className='main'>
    
  
    {/* <NavProfile/> */}
    <ShowNavbar>
    <Navbar/>
    <NavMobile setIsOpen={setIsOpen} isOpen={isOpen}/>
    <Box/>
    <Basket/>
    <BasketNav/>
    </ShowNavbar>
  
    <NavSidebar setIsOpen={setIsOpen} isOpen={isOpen}/>
   
    {/* FRONT */}
    <NavigationProvider>
    <Routes>
               
                <Route path="/" element={<Header />} />
                <Route path='/order' element={<OrderPrivateRoute />} />
                <Route path='/profile' element={<ProfilePrivateRoute />} />
                <Route path='/purchases' element={<PurchasesPrivateRoute />} />
                <Route path='/favourite' element={<FavouriteBrandsPrivateRoute />} />
                <Route path='/search/:search' element={<SearchBrand />} />
                <Route path='/user/login' element={<Login />} />
                <Route path='/user/signup' element={<Registration />} />
                <Route path='/brand/:id' element={<BrandPro />} />
                <Route path='/about' element={<About />} />

                {/* ADMIN */}
                <Route path='/admin/login' element={<Login />} />
                <Route path="/admin/" element={<AdminPrivateRoute />}>
                    <Route path='main' exact element={<Home />} />
                    <Route path='courier' exact element={<Courier />} />
                    <Route path='brand' exact element={<Brand />} />
                    <Route path='customer' exact element={<Customer />} />
                    <Route path='order' exact element={<Order />} />
                    <Route path='product/:id' exact element={<Product />} />
                    <Route path='user' exact element={<User />} />
                    <Route path='admin' exact element={<Admin />} />
                    <Route path='favourite' exact element={<FavouriteFood />} />
                    <Route path='category' exact element={<Category />} />
                    <Route path='offer' exact element={<Offer />} />

                    <Route path="/admin/" element={<OwnerPrivateRoute />}>
                        <Route path='admin/create' exact element={<AdminAddUpdate />} />
                    </Route>

                    {/* BRAND */}
                    <Route path='brand/create' exact element={<BrandAddUpdate />} />
                    <Route path='brand/product/create' exact element={<BrandProductAddUpdate />} />
                    <Route path='brand/product/update/:id' exact element={<BrandProductAddUpdate />} />
                    <Route path='courier/create' exact element={<CourierAddUpdate />} />
                    <Route path='customer/create' exact element={<CustomerAddUpdate />} />
                    <Route path='user/create' exact element={<UserAddUpdate />} />
                    <Route path='brand/:id' exact element={<BrandProduct />} />
                    <Route path='brand/update/:id' exact element={<BrandAddUpdate />} />
                    <Route path='customer/update/:id' exact element={<CustomerAddUpdate />} />
                    <Route path='courier/update/:id' exact element={<CourierAddUpdate />} />
                    <Route path='admin/update/:id' exact element={<UserAddUpdate />} />
                    <Route path='user/update/:id' exact element={<UserAddUpdate />} />
                    <Route path='product/update/:id' exact element={<ProductAddUpdate />} />
                </Route>
            </Routes>
    </NavigationProvider>
   
    </div>
    
      <ShowNavbar>
    <Footer/>
    </ShowNavbar>
      
    </div>
  )
}

export default App