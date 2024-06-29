import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherGraph = ({ data }) => {
  const labels = data.forecast.forecastday[0].hour.map((hour) => hour.time.split(' ')[1]);
  const temperatures = data.forecast.forecastday[0].hour.map((hour) => hour.temp_c);
  const precipitations = data.forecast.forecastday[0].hour.map((hour) => hour.precip_mm);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y-axis-temperature',
      },
      {
        label: 'Precipitation (mm)',
        data: precipitations,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        yAxisID: 'y-axis-precipitation',
      },
    ],
  };

  const options = {
    scales: {
      'y-axis-temperature': {
        type: 'linear',
        position: 'left',
      },
      'y-axis-precipitation': {
        type: 'linear',
        position: 'right',
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Temperature (°C)') {
              return `${context.label}: ${context.raw}°C`;
            } else if (context.dataset.label === 'Precipitation (mm)') {
              return `${context.label}: ${context.raw} mm`;
            }
          }
        }
      }
    }
  };

  return (
    <div className="weather-graph">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherGraph;
