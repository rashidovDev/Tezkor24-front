import { useState } from "react"
import {UserData} from "./data"
import {Line} from "react-chartjs-2"

const LineChart = () => {


    const [userData, setUserData] = useState({
        labels : [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        datasets : [{
          label : "Users gained",
          data : [280, 320, 340, 342, 400, 410, 425],   
          backgroundColor : ['#F29314']
        }]
      })


  
    return (
      <div className="w-[80%] flex justify-center items-center ">
          <Line data={userData} /> 
      </div>
    )
  }
  
  export default LineChart