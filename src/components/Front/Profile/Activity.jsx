import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkToken, GET } from '../../../api/frontApi'

const Activity = () => {

  const [user, setUser] = useState()


 const getUser = async () => {
     checkToken()
     const response = await GET(`/auth/user-data`)
     setUser(response.user)
    
   }

     
    
      useEffect(() => {
      getUser()
      },[])

  return (
    <div className='flex px-2 items-center justify-center w-full border-b-[1.5px] border-[#e7e7e7]'>
    <div className='flex flex-col justify-center items-center w-[33%]  '>
    <div className='text-[24px]  font-bold'>Total number of orders</div>
    <div className='text-[20px]'>{user ? user.numberOfOrders : 0}</div>
    </div>

    <div className='flex flex-col justify-center items-center w-[33%] border-l-[2px]  '>
    <div className='text-[24px]  font-bold'>Total amount spent</div>
    <div className='text-[20px]'>{user ? user.userSpent : 0} sum</div>
    </div>

    <div className='flex flex-col justify-center items-center w-[33%] border-l-[2px] '>
    <div className='text-[24px]  font-bold'>Earned points</div>
    <div className='text-[20px]'>8</div>
    </div>

    
   
    {/* <div>Total amount spent</div>

    <div>Earned points</div> */}
    </div>
  )
}

export default Activity