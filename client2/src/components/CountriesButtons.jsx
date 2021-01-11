import React, { useState, useEffect } from "react";
const CountriesButtons = ({ countries }) => {
  const [item, setItem] = useState(1);
  useEffect(() => {
    console.log("countries in buttons", countries);
  }, []);
  return (
    <div>
      {countries.map((newContinent) => (
        <button
          key={newContinent.name}
          onClick={() => {
            console.log("selected ", newContinent.name);
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
