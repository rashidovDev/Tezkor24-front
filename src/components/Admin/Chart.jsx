import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from "recharts";



  import React from 'react'
  
  const Chart = () => {
    const data = [
        { name: "Jan", sales: 2320000 },
        { name: "Feb", sales: 3456900 },
        { name: "Mar", sales: 2869900 },
        { name: "Apr", sales: 4156900 },
      ];
    return (
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    )
  }
  
  export default Chart