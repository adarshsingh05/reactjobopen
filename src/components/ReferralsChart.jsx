// ReferralsChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const ReferralsChart = () => {
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Referrals Given",
        data: [5, 2, 4, 6, 8, 3, 5, 7, 4, 6, 5, 7], // Sample data for referrals given
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Referrals Received",
        data: [3, 4, 2, 5, 6, 4, 3, 6, 5, 7, 4, 6], // Sample data for referrals received
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ReferralsChart;
