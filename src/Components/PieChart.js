import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Improper Form', 'Proper Form', ],
  datasets: [
    {
      label: '# of Votes',
      data: [22, 78],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        
        'rgba(75, 192, 192, 0.2)',
    
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
       
        'rgba(75, 192, 192, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return <Pie data={data} />;
}