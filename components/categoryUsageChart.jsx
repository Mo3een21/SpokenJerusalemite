// components/CategoryUsageChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CategoryUsageChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Course Categories',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(247, 199, 201)',
          'rgba(33, 84, 84, 1)',
          'rgba(235, 112, 105 )',
          'rgba(255, 247, 237)'
        ],
        borderColor: [
            'rgba(247, 199, 201,1)',
            'rgba(33, 84, 84, 1,1)',
            'rgba(235, 112, 105 ,1)',
            'rgba(255, 247, 237,1)'        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default CategoryUsageChart;
