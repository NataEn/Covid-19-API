import "./App.css";
import Chart from "./components/Chart";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { getCountriesInContinent } from "./utils/apiCalls";

const App = () => {
  const [continent, setContinent] = useState("Africa");
  const [chartData, setChartData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const continents = ["Africa", "Asia", "Europe", "America", "World"];
  const COVIDParams = ["Confirmed", "Deaths", "Recovered", "Critical"];

  const getCOVIDParamData = (param) => {
    console.log(param);
    //update chartData on getting the param data
  };
  const getCountryData = (country) => {
    console.log(country);
    //const [Confirmed, Deaths, Recovered, Critical]=filterCountryData(continent)
    //update country data
  };

  useEffect(() => {
    let mounted = true;
    getCountriesInContinent(continent).then((countries) => {
      console.log(countries);
      if (mounted) {
        setCountries(countries.data);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    getCOVIDParamData(continent);
    return () => {
      //cleanup
    };
  }, [continent]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID 19 WORLD Data</h1>
      </header>
      <Chart data={chartData} />
      {COVIDParams &&
        COVIDParams.map((param) => (
          <Button key={param} text={param} onClick={getCOVIDParamData} />
        ))}
      {continents &&
        continents.map((continent) => (
          <Button
            key={continent}
            text={continent}
            onClick={(continent) => setContinent(continent)}
          />
        ))}
      {countries &&
        countries.map((country) => (
          <Button
            key={country.name}
            text={country.name}
            onClick={() => getCountryData(country.name)}
            flagUrl={country.flagUrl}
          />
        ))}
    </div>
  );
};

export default App;
