import React from "react";
import { Link } from "react-router-dom";
const CONTINENTS = ["Africa", "Asia", "Europe", "Americas", "World"];

const ContinentsButtons = ({
  setCovidDataLoaded,
  setCountriesLoaded,
  setContinent,
}) => {
  return CONTINENTS.map((newContinent) => (
    <Link to="/">
      <button
        key={newContinent}
        onClick={() => {
          if (newContinent === "World") {
            setContinent("");
          } else {
            setContinent(newContinent);
          }
          console.log("setting new continent");

          setCovidDataLoaded(false);
          setCountriesLoaded(false);
        }}
      >
        {newContinent}
      </button>
    </Link>
  ));
};
export default ContinentsButtons;
