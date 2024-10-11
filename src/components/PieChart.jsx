import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartData = {
    labels: [
      'Applications Submitted',
      'No of Interviews Cleared',
      'Total No of Interviews',
      'No of Job Offers',
    ],
    datasets: [
      {
        data: data,
        backgroundColor: ['#1c56f0', '#01f769', '#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#02060f',
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Change to 'bottom' for better label placement
        labels: {
          font: {
            size: 14, // Customize label font size
            family: 'Arial', // Customize font family
          },
          color: '#ffffff', // Set color for the labels
          boxWidth: 20, // Reduce the box size next to the labels
          padding: 20,  // Add padding between legend items
        },
      },
      tooltip: {
        backgroundColor: '#333', // Tooltip background color
        titleFont: { size: 16 }, // Tooltip title font size
        bodyFont: { size: 14 }, // Tooltip body font size
        bodyColor: '#ffffff', // Tooltip text color
        displayColors: true, // Remove the color box in the tooltip
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio to prevent cutting off
  };
  

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
