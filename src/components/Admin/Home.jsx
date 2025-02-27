import React, { useEffect, useState } from 'react'
import BarChart from './Charts/BarChart'
import {Chart as ChartJS} from "chart.js/auto"
import Line from './Charts/LineChart'
import PieChart from './Charts/PieChart'
import { BarChart2, DollarSign, ShoppingBag, Truck, UserPlus } from 'react-feather'
import { FcStatistics } from "react-icons/fc";
import Clock from './Clock'
import { FaList } from 'react-icons/fa'
import { GET } from '../../api/adminApi'
import Chart from './Chart'
import LineChart from './Charts/LineChart'
import AreaChart from './Charts/AreaChart'


const Home = () => { 

  const [data, setData] = useState()

  async function getItems() {
      const response = await GET(`/admin/dashboard/dashboard-data`)
      setData(response)
  }

       useEffect(() => {
              getItems()     
        },[])

    
        

  return (
    <div className='p-2'>
    <div  className='mb-3 flex justify-between border-bottom py-1 px-1'>
        <div className='flex  items-center '> 
          <BarChart2 className='mr-2' color='#F29314' size={22} />
           <span className='text-[25px]'>Statistics</span>
          </div>  
          <div><Clock/></div> 
     </div>
      <div className='flex'>
      <div className='w-full '>

      <div className='w-[80%] dashboard'>

      <div className=' rounded-lg h-[85px] bg-[#2FCC76] text-[#fff] flex items-center justify-center p-1'>
      <div className=' w-[40%] flex justify-center'>
      <div className='w-[40px] h-[40px] bg-[#fff] rounded-lg flex justify-center items-center'>
      <Truck color={'#2FCC76'} size={22} />
      </div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[24px] font-bold text-center'>Total orders</div>
      <div className='font-semibold text-[20px]'>{data && data.totalOrder}</div>
      </div>
      </div>
      </div>

      <div className=' rounded-lg h-[85px] text-[#fff] bg-[#30C3E0] flex items-center justify-center  p-1'>
      <div className='w-[40%] flex justify-center'>
      <div className='w-[40px] h-[40px] bg-[#fff] rounded-lg flex justify-center items-center'>
      <DollarSign color={'#30C3E0'} size={22} />
      </div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[24px] font-bold text-center'>Total revenue</div>
      <div className='font-semibold text-[20px]'>{data && data.totalRevenue} sum</div>
      </div>
      </div>
      </div>

      <div className=' rounded-lg h-[85px] text-[#fff] bg-[#FA5741] flex items-center justify-center p-1'>
      <div className=' w-[40%] flex justify-center'>
      <div className='w-[40px] h-[40px] bg-[#fff] rounded-lg flex justify-center items-center'>
      <UserPlus color={'#FA5741'} size={22} />
      </div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[24px] font-bold text-center'>Users</div>
      <div className='text-[20px] font-semibold'>{data && data.totalUser}</div>
      </div>
      </div>
      </div>

      <div className=' rounded-lg h-[85px] text-[#fff] bg-[#F1A441] flex items-center justify-center p-1'>
      <div className=' w-[40%] flex justify-center'>
      <div className='w-[40px] h-[40px] bg-[#fff] rounded-lg flex justify-center items-center'>
      <ShoppingBag color={'#F1A441'} size={22} />
      </div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[24px] font-bold text-center'>Restaurants</div>
      <div className='font-semibold text-[20px]'>{data && data.totalBrand}</div>
      </div>
      </div>
      </div>
     
      </div>
      <div className='chart'>
     
        <div className=''>
        <BarChart />
        </div>
        <div className='item-chart m-3'>
        <LineChart />
        </div>
        <div className='item-chart '>
          <PieChart />
        </div>

        <div className='item-chart '>
          <AreaChart />
        </div>
        
       
      </div>


      </div>
      




      {/* <div className='w-[20%]'>

      <div className='w-[90%] mx-auto'>

      <div className=' rounded-lg bg-[#F1F5F9] flex items-center justify-center mb-3 h-[200px]'>
      <div className='p-4 w-[40%] flex justify-center'>
      <div className='w-[45px] h-[45px] bg-[#fff] rounded-lg'></div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[18px] font-bold '>Top Restaurant</div>
      <div className='font-semibold'>1232</div>
      </div>
      </div>
      </div>

        
      <div className='w-full h-[200px] rounded-lg bg-[#F1F5F9] flex items-center mb-3'>
      <div className='flex flex-col justify-center items-center font-bold'>
      <div className='text-[18px] font-bold mb-3'>Most ordered food</div>
      <div className='flex  justify-center items-center'>
        <img className='w-[40%] mx-auto rounded-2xl' src={require('../../assets/plov.jpg')} alt="" />
        <h5>Plov</h5>
      </div>
      </div>
      </div>


      <div className=' h-[200px] rounded-lg bg-[#F1F5F9] flex items-center justify-center'>
      <div className=' flex justify-center'>
      <div className='w-[45px] h-[45px] bg-[#fff] rounded-lg'></div>
      </div>
      <div className=' w-[60%] flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
      <div className='text-[18px] font-bold text-center'>Total users</div>
      <div className='font-semibold'>1232</div>
      </div>
      </div>
      </div>


      </div>

      </div> */}
      
      </div>
      

    
     
      
      
    </div>
  )
}

export default Home