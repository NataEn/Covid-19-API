import React from "react";
import { Link } from "react-router-dom";

const CountriesButtons = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <Link to={`/${country.name}`}>
          <button
            key={country.name}
            onClick={() => {
              console.log("selected ", country.name);
              setSelectedCountry(country.name);
            }}
          >
            {country.name}
            <img alt={country.name} src={country.flagUrl} />
          </button>
        </Link>
      ))}
    </div>
  );
};
export default CountriesButtons;
