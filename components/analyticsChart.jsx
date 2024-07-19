import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

const AnalyticsChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => DateTime.fromISO(item.date).toFormat('yyyy-MM-dd')),
    datasets: [
      {
        label: 'Daily Users',
        data: data.map(item => item.users),
        fill: false,
        backgroundColor: '#215424',
        borderColor: '#215424',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'DD T',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Users',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AnalyticsChart;
