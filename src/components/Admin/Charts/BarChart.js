import React, { useState } from 'react'
import {Bar, Line} from "react-chartjs-2"
import {UserData} from "./data"

const BarChart = () => {

  const numbersArray = [];
  const randomArray = [];

for (let i = 0; i < 25; i++) {
const randomNumber = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
randomArray.push(randomNumber);
}

 for (let i = 1; i <= 15; i++) {
  numbersArray.push(i);
 }

  const [userData, setUserData] = useState({
      labels : numbersArray.map(number => number),
      datasets : [{
        label : "Total sales income/day",
        data : randomArray.map(random => random),  
        backgroundColor : ['#F29314']
      }]
    })

 

  return (
    <div className='w-[80%] flex justify-center items-center m-3'>
        <Bar data={userData} /> 
    </div>
  )
}

export default BarChart

