import "./App.css";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import {
  getCountriesInContinent,
  getCountyInfo,
  getGlobalInfo,
  getCountriesInfo,
} from "./utils/apiCalls";

const App = () => {
  const [globalInfo, setGlobalInfo] = useState(null);
  const [continent, setContinent] = useState("asia");
  const [continentData, setContinentData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [COVIDParam, setCOVIDParam] = useState("Confirmed");
  const continents = ["Africa", "Asia", "Europe", "America", "World"];
  const COVIDParams = ["Confirmed", "Deaths", "Recovered", "Critical"];

  useEffect(() => {
    getCountriesInContinent(continent)
      .then((countries) => {
        console.log("countries", countries.data);
        setCountries(countries.data);
      })
      .then(() => {
        if (!globalInfo) {
          const res = getGlobalInfo().then((response) => {
            console.log("global info", response);
            setGlobalInfo(response);
            return response;
          });
          return res;
        }
      })
      .then((response) => {
        getContinentData("asia", response);
      });

    return () => {};
  }, [continent]);
  const setCOVIDParamData = (param) => {
    console.log(COVIDParam);
    setCOVIDParam(param);
    //update chartData on getting the param data
  };
  const getContinentData = (continent, globalInfo) => {
    console.log("getContinentalData", continent, "globalInfo", globalInfo);
    const info = getCountriesInfo(countries, globalInfo);
    console.log("info", info);
    setContinentData(info);
  };
  const getCountryData = (country) => {
    console.log(country);
    const data = continentData.get(country);
    setCountryData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID 19 WORLD Data</h1>
      </header>
      {!continentData ? <Spinner /> : <Chart info={continentData} />}
      {COVIDParams &&
        COVIDParams.map((param) => (
          <Button key={param} text={param} onClick={setCOVIDParamData} />
        ))}
      <br />
      {continents &&
        continents.map((continent) => (
          <Button
            key={continent}
            text={continent}
            onClick={(continent) => setContinent(continent)}
          />
        ))}
      <br />
      {!countries ? (
        <Spinner />
      ) : (
        countries.map((country) => (
          <Button
            key={country.name}
            text={country.name}
            onClick={() => getCountryData(country.name)}
            flagUrl={country.flagUrl}
          />
        ))
      )}
    </div>
  );
};

export default App;
