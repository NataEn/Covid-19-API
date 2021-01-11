import React, { useState, useEffect } from "react";
import COVIDChart from "./COVIDChart";
const continents = ["Africa", "Asia", "Europe", "Americas", "World"];
const COVIDParams = ["Confirmed", "Deaths", "Recovered", "Critical"];

const Chart = ({ covidData, setCovidDataLoaded }) => {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [COVIDParam, setCOVIDParam] = useState("Confirmed");
  useEffect(() => {
    console.log("covidData in chart", covidData);
    function calculateChartData() {
      const labels = [...covidData.keys()];
      setLabels(labels);
      const COVIDData = [...covidData.values()].map((value) =>
        value ? value[COVIDParam.toLowerCase()] : 0
      );
      setData(COVIDData);
    }
    calculateChartData();
  }, [COVIDParam]);
  return (
    <div>
      my content
      <COVIDChart covidDataSet={data} covidLabels={labels} />
      {COVIDParams.map((param) => (
        <button
          key={param}
          onClick={() => {
            setCOVIDParam(param);
          }}
        >
          {param}
        </button>
      ))}
      <br />
    </div>
  );
};
export default Chart;
