import React, { useState, useEffect } from "react";
const CountriesButtons = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.map((newContinent) => (
        <button
          key={newContinent.name}
          onClick={() => {
            console.log("selected ", newContinent.name);
            setSelectedCountry(newContinent.name);
          }}
        >
          {newContinent.name}
          <img alt={newContinent.name} src={newContinent.flagUrl} />
        </button>
      ))}
    </div>
  );
};
export default CountriesButtons;
