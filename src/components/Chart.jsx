import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ data }) => {
  const chartData = {
    labels: ['Feb', 'March', 'April', 'May', 'June', 'July'], // Months
    datasets: [
      {
        label: 'Number of Interviews', 
        data: data, // Pass the number of interviews here
        fill: false, // Do not fill the area under the line
        borderColor: '#6f42c1', // Line color (purple)
        backgroundColor: '#6f42c1', // Point color (same as the line)
        pointBackgroundColor: '#6f42c1', // Points color
        tension: 0.2, // Curve the line slightly
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Remove the label
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at 0
        ticks: {
          color: '#000', // Color for the y-axis labels
        },
      },
      x: {
        ticks: {
          color: '#000', // Color for the x-axis labels
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
