import React from "react";
import { useParams } from "react-router-dom";
const COVID_PARAMS = [
  "Confirmed",
  "today_confirmed",
  "Deaths",
  "today_deaths",
  "Recovered",
  "Critical",
];
const CountryData = ({ data, continent }) => {
  const { country } = useParams();
  console.log("from country page", data);
  return (
    <div>
      <h2>{country}</h2>
      <div className="country-data-container">
        {COVID_PARAMS.map((key) => (
          <div className="country-data">
            <h4>total {key} cases:</h4>
            <p>{data[key.toLocaleLowerCase()]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CountryData;
