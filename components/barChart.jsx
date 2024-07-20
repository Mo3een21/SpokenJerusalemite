import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AverageTimeSpentChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Average Time Spent (minutes)',
        data: data.map(item => item.timeSpent),
        backgroundColor: '#215424',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default AverageTimeSpentChart;
