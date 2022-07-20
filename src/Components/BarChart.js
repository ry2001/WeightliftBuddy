import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'PR Progress Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const values1 = [ 60, 65, 70, 75, 80, 85, 90]
  const values2 = [ 55, 60, 70, 73, 77, 80, 85]

  export const data = {
    labels,
    datasets: [
      {
        label: 'Record',
        data: values2,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Goal',
        data: values1,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  

  export default function BarChart() {
    return <Bar options={options} data={data} />;
  }