import { useState } from "react"
import {UserData} from "./data"
import {Pie} from "react-chartjs-2"

const PieChart = () => {

    const data = {
        labels: [
          'Basri Baba',
          'Bellisimo Pizza',
          'Rayhon',
          'Oqtepa Lavash'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [12,38,21,29],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'red'
          ],
          hoverOffset: 4
        }]
      };

  
  
  
    return (
      <div className="w-[80%] h-[320px] flex justify-center items-center m-3">
          <Pie data={data} /> 
      </div>
    )
  }
  
  export default PieChart