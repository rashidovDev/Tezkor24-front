import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {
	Home, ShoppingBag, ChevronDown,
	Menu, User, Truck, LogOut, XCircle, Shield, Star,
	Zap
} from 'react-feather';
import { BiCategory } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { logoutAdminUser } from '../../store/slices/userSlice';


const Sidebar = ({ children }) => {
	let navigate = useNavigate();
	const [name, setName] = useState('Dashboard')
 	const [user, setUser] = useState()
	const [profile, setProfile] = useState(false)
	const [showSideBar, setShowSideBar] = useState(false)
	const baseURL = process.env.REACT_APP_IMAGE
	const [menu, setMenu] = useState([
		{
			icon: <Home className="mr-2" size={16} />,
			name: 'Dashboard',
			path: '/admin/main',
			show: false,
			children: []
		},
		{
			icon: <Truck className="mr-2" size={16} />,
			name: 'Orders',
			path: '/admin/order',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new order',
					path: '/admin/order/create'
				},
				{
					name: 'Update order',
					path: '/admin/order/update/'
				},
			]
		},
		{
			icon: <ShoppingBag className="mr-2" size={16} />,
			name: 'Brands',
			path: '/admin/brand',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
		{
			icon: <User className="mr-2" size={16} />,
			name: 'Customers',
			path: '/admin/customer',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
		{
			icon: <Truck className="mr-2" size={16} />,
			name: 'Couriers',
			path: '/admin/courier',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
		{
			icon: <Star className="mr-2" size={16} />,
			name: 'Favourite foods',
			path: '/admin/favourite',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},

		{
			icon: <Zap className="mr-2" size={16} />,
			name: 'Offers',
			path: '/admin/offer',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},

		{
			icon: <BiCategory className="mr-2" size={16} />,
			name: 'Category',
			path: '/admin/category',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
		
		{
			icon: <Shield className="mr-2" size={16} />,
			name: 'Admins',
			path: '/admin/admin',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
	])

	async function getUser() {
		const currentUser = JSON.parse(localStorage.getItem("admin_user"))
		setUser(currentUser.data.user)
	}

	useEffect(() => {
		getUser()
	}, [])
	const dispatch = useDispatch()

	async function logout() {
		dispatch(logoutAdminUser())
		navigate("/admin/login")
	}

	return (
		<div className='flex relative'>

			{/* SideBar */}
			<div className={`${showSideBar ? 'sidebar-left-margin' : 'sidebar-right-margin '} 
            w-[300px] min-h-screen bg-[#F1F5F9]`}>
				{/* Logo */}
				<div className='flex h-[70px] items-center justify-center border-b-2  border-b-[#fff]'>
					<img className='w-[60px]' src={require('../../assets/logomain.png')} alt="" />
					<div className='text-[18px] mt-[2px]  text-[#000] font-[600]'>TEZKOR 24</div>
				</div>
				{/* SideBar Nav */}
				<div className='mt-8 hover:text-[#000] text-[#000]'>
					{
						menu.map((item, idx) => {
							return (
								<NavLink to={item.path} className='no-underline hover:text-[#fff] ' key={idx + 1}>
									<div onClick={() => setName(item.name)}  className={`${item.name === name && 'main-bg'} my-1 ml-3  px-4 py-[10px] pl-5 
									 text-[18px] hover:bg-[#F29314] hover:text-[#fff] rounded-[10px] mx-1 cursor-pointer`}>
										<NavLink  to={item.path} className="flex items-center justify-between text-[#000] no-underline text-[16px]">
											<div  className={`${item.name === name && 'text-[#fff]'} flex items-center hover:text-[#fff] text-[#000]`}> 
												 <span>{item.icon}</span> <span>{item.name}</span>  </div  > 
										</NavLink>
									</div>	
								</NavLink>
							)
						})
					}
				</div>
			</div>
			<div className='w-screen relative'>
				<div className='h-[70px] bg-[#F1F5F9] text-[#000] flex items-center justify-between px-[35px]'>
					<div>
						<button onClick={() => setShowSideBar(!showSideBar)}><Menu className="mr-2" size={24} /></button>
					</div>
					<div className='w-[180px]'>
						{
							user
								?
								<div className=''>
									<div onClick={() => setProfile(!profile)} className='flex cursor-pointer items-center justify-center'>
										<img className='w-[40px] mt-2 h-[40px] mr-2 object-cover rounded-full' src={`${baseURL}${user.avatar}`} alt="" />

										<div className='w-[20px] mb-1 mt-[10px]'><ChevronDown size={16} /></div>
									</div>

									{/* PROFILE */}
									{profile && (
										<div className='z-50 bg-[#fff] absolute w-[180px] rounded-[10px] shadow right-10 py-3 px-2 top-[80px] text-[#000]'>
											<div className='flex items-center justify-between'>
												<p className='text-[20px]'>User Profile</p>
												<p onClick={() => setProfile(false)}><XCircle className="mr-2 cursor-pointer" size={20} /></p>
											</div>
											<div className='flex items-center justify-between'>
												<img className='w-[80px] h-[80px] object-cover rounded-full' src={`${baseURL}${user.avatar}`} alt="" />
												<div className='mt-[10px]'>
													<p>{user.username}</p>
													<p>{user.roles[user.roles.length-1].toUpperCase()}</p>
												</div>
											</div>
											<button
												onClick={logout}
												className='p-[7px] text-[#fff] w-full border-1 mt-3 main-bg 
				                                                   flex items-center text-center justify-center rounded-[6px]'>
												<span className='mr-[5px] '><LogOut size={16} /></span> <span> Logout </span>
											</button>
										</div>
									)}

								</div>
								:
								<div className='flex justify-end'>
									<button><User className="mr-2" size={28} /></button>
								</div>
						}
					</div>
				</div>
				<div className='relative'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Sidebar

