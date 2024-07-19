
// components/CourseSignupChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const CourseSignupChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.course),
    datasets: [
      {
        label: 'Number of Signups',
        data: data.map(item => item.signups),
        backgroundColor: 'rgba(33, 84, 84, 0.8)',
        borderColor: 'rgba(33, 84, 84, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Courses',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Signups',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CourseSignupChart;
