import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const COVIDChart = ({ data2, covidParam }) => {
  // const [labels2, setLabels2] = useState(null);
  // const [chartData, setChartData] = useState(null);
  // console.log(typeof data2)
  // useEffect(() => {
  //   // setLabels2(data2.keys());
  //   // const mapValues = data2.values();
  //   // const chartData2 = mapValues.map((item) => item[covidParam]);
  // }, []);
  const labels2 = [...data2.keys()];
  const chartData = [...data2.values()].map(
    (value) => value[covidParam.toLowerCase()]
  );

  console.log("from chart", data2, covidParam, chartData, labels2);

  const data = {
    labels: labels2,
    datasets: [
      {
        label: covidParam,
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      xAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: "X Axis",
          },
        },
      ],
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            min: 1000,
            max: 10000000,
            callback: function (value, index, values) {
              return value;
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Y Axis",
          },
        },
      ],
    },
  };

  return (
    <div className="COVID-chart-container">
      <Line data={data} options={options} />
    </div>
  );
};
export default COVIDChart;
