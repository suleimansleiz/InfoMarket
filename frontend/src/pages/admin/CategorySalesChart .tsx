import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CategorySalesChart: React.FC = () => {
  const data = {
    labels: ['Accessories', 'Bags', 'Curtains', 'Computers', 'Phones'],
    datasets: [
      {
        label: 'Items Bought',
        data: [45, 30, 25, 60, 80], // <-- Replace with dynamic backend data later
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => `${context.parsed.y} items`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
        },
        title: {
          display: true,
          text: 'Items Bought',
          color: '#333',
        },
      },
      x: {
        ticks: {
          color: '#666',
        },
        title: {
          display: true,
          text: 'Category',
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="card-chart-container">
      <div className='card-chart card p-4 shadow-sm'>
        <h4 className="mb-4 text-center">Items Bought Per Category</h4>
        <Bar className='bar-chart' data={data} options={options} />
      </div>
    </div>
  );
};

export default CategorySalesChart;
