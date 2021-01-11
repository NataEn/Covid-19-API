import React from "react";
const COVIDParams = [
  "Confirmed",
  "today_confirmed",
  "Deaths",
  "today_deaths",
  "Recovered",
  "Critical",
];
const CountryData = ({ data, country }) => {
  console.log("from country page", data);
  return (
    <div>
      <h3>{country}</h3>
      <div>
        {COVIDParams.map((key) => (
          <h4>
            total {key} cases: {data[key.toLocaleLowerCase()]}
          </h4>
        ))}
      </div>
    </div>
  );
};
export default CountryData;
