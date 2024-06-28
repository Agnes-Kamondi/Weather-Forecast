import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';


Chart.register(...registerables);

const WeatherGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const temperatures = data.forecast.forecastday[0].hour.map(hour => hour.temp_c);
  const labels = data.forecast.forecastday[0].hour.map(hour => hour.time.split(' ')[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  };

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'line',
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="weather-graph">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default WeatherGraph;

