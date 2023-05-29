import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTranslation } from 'react-i18next';

export default function BarChart({ students }) {
  const [chartData, setChartData] = useState([]);
  // const patientsByMonth =
  //   chartData.maleData &&
  //   chartData.maleData.reduce((acc, patient) => {
  //     const month = patient.month.substring(0, 7); // Extract year and month from date string
  //     if (!acc[month]) {
  //       acc[month] = 1; // If month doesn't exist in accumulator, set count to 1
  //     } else {
  //       acc[month]++; // If month exists in accumulator, increment count
  //     }
  //     return acc;
  //   }, {});
  // Count the number of male and female students

  const { t } = useTranslation();

  useEffect(() => {
    setChartData(students);
  }, [students]);

  const maleCount = chartData.filter(
    (student) => student.gender === 'male'
  ).length;
  const femaleCount = chartData.filter(
    (student) => student.gender === 'female'
  ).length;

  const data = {
    labels: [t('male'), t('female')],
    datasets: [
      {
        label: t('number_of_students'),
        data: [maleCount, femaleCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // blue for male
          'rgba(255, 99, 132, 0.2)', // pink for female
        ],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                stepSize: 1, // <-- set the step size to 5
              },
            },
          },
        }}
        height={300}
        width={500}
        data={data}
      />
    </div>
  );
}
