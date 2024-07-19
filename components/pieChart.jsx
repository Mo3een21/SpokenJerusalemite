import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const FormUsageChart = ({ data }) => {
  const chartData = {
    labels: ['Used Form', 'Did Not Use Form'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#215424', 'rgb(245, 146, 149)'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default FormUsageChart;
