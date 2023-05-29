import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function LineChart(patientEachMonth) {
  const [chartData, setChartData] = useState([]);

  const patientsByMonth =
    chartData.patientEachMonth &&
    chartData.patientEachMonth.reduce((acc, patient) => {
      const month = patient.month.substring(0, 7); // Extract year and month from date string
      if (!acc[month]) {
        acc[month] = 1; // If month doesn't exist in accumulator, set count to 1
      } else {
        acc[month]++; // If month exists in accumulator, increment count
      }
      return acc;
    }, {});

  useEffect(() => {
    setChartData(patientEachMonth);
  }, [patientEachMonth]);

  const data = {
    labels: patientsByMonth && Object.keys(patientsByMonth),
    datasets: [
      {
        label: ' Patients ',
        data: patientsByMonth && Object.values(patientsByMonth),
        // chartData.patientEachMonth &&
        // chartData.patientEachMonth.map((v) => v.patient),
        // borderColor: 'blue',
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Number of Patients by Month',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1, // <-- set the step size to 5
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} height={300} width={500} />;
}
