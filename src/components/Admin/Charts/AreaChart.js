import React from "react";
import { Line } from "react-chartjs-2";

const AreaChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4000, 3200, 5000, 4200, 6000],
        backgroundColor: "rgba(0,0,0,0)", // Area fill color
        borderColor: "#F29314", // Line color
        borderWidth: 2,
        pointBackgroundColor: "#fff", // Data point color
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
        fill: true, // Enable area filling
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{ gridLines: { display: false } }],
      yAxes: [{ ticks: { beginAtZero: true } }],
    },
  };

  return (
    <div className="w-[80%] h-[320px] flex justify-center items-center m-3">
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;