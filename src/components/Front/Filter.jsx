import React, { useState } from 'react'
import { FaSort } from "react-icons/fa";
import Modalview from  '../Modal/Modal-view';
import * as motion from "motion/react-client"
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch, useSelector } from 'react-redux';
import { hideFilter, showFilter } from '../../store/slices/toggleSlice';
import { showModalView } from '../../store/slices/modalSlice';

const Filter = ({setCategory}) => {

const [animate, setAnimate] = useState(true); 
const [selectedCategory, setSelectedCategory] = useState('All')
 const [label, setLabel] = useState('I trust you')
  const ball = {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: '50%',
};

const category = ['All', 'Burgers', 'Fastfood', 'Sushi', 'Pizza', 'Lunch', 'Georgia', 'Italy', 'Russian', 'Turkish', 'Uzbek', "Halal"]

const filterIsVisible = useSelector(state => state.toggle.filterIsVisible) || false
const dispatch = useDispatch()

  const sort = ['I trust you', 'Top rating', 'Fastest delivery']

  const handleButtonClick = (label) => {
    setLabel(label)
    setAnimate(false);
};

const handleCategory = (category) => {
  setSelectedCategory(category)
  setCategory(category)
}


  return (
    <div className=' my-3 select-none py-1 relative'>
<div className='flex justify-between items-center md:h-[50px] h-[40px] bg-[#F3F1EE] px-1 rounded-[15px]'>
<div className='flex justify-start overflow-auto'>     
  {category.map((item, idx) => (
     <div key={idx + 1} onClick={() => handleCategory(item)}
      className={`md:mr-9 mr-4  ${item === selectedCategory && 'bg-white'} py-[4px] px-2  md:py-[6px]
       md:px-3 rounded-[15px]  hover:bg-white transition-all duration-100 text-[13px] md:text-[15px]
      cursor-pointer`}>{item}</div>
))}
 </div>
<div>
  <div 
  onClick={(e) =>{
    e.stopPropagation()
    dispatch(showFilter())
  } }
  className='mr-3 flex md:px-3 px-1 md:py-2 py-1 justify-center items-center cursor-pointer 
  rounded-[15px] hover:bg-white transition-all duration-100 relative '>
    <span className='mr-[1px] mt-[1px]'><FaSort /></span>
    <span className='select-none text-[14px]
    md:text-[18px] md:font-normal font-semibold'
    >Sorting</span>
   <div className='absolute top-[40px] right-0'>
    {filterIsVisible && (
  <Modalview width='220px'>  
  <div className='bg-[#fff] w-full m-auto 
   p-1 items-center flex'>
    <div className='w-full '>
      <div className='border-b-[1px] mb-2'>
      {sort.map((item, idx) => (
                            <div key={idx + 1} onClick={() => handleButtonClick(item)}
                                className='py-2 my-2 px-1 rounded-[5px] w-full flex  items-center '>
                                <div className={`w-[24px] h-[24px] 
                                ${label == item  ?  'bg-[#F29314] ' : 'bg-[#EAEAEA]'}  duration-300 transition-all rounded-full flex 
                                justify-center items-center`}>
                                    <motion.div      
                                        style={ball}
                                        animate={label == item ? { opacity: 0.5, scale: 0.5 } : { opacity: 1, scale: 0 }}
                                        initial={{ opacity: 1, scale: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                        }}
                                    />
                                </div>
                                <div className='ml-4'>{item}</div>
                            </div>
                        ))}
      </div>
   

      

      <div>
      <button onClick={() => {
      setCategory(label) 
      setSelectedCategory('')
      dispatch(hideFilter())
      }} className='main-color my-1 px-1 py-2 w-full rounded-[15px]'>Show</button>
        </div> 
    </div>
  </div>
</Modalview>
    )
     
    

    }
      
    </div>
  </div>
            </div>
           
        </div>
    </div>
  )
}

export default Filter