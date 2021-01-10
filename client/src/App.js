import "./App.css";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import {
  fetchCountriesInContinent,
  getCountryInfo,
  fetchGlobalInfo,
  getContinentInfo,
} from "./utils/apiCalls";

const App = () => {
  const [globalInfo, setGlobalInfo] = useState(null);
  const [continent, setContinent] = useState("asia");
  const [continentData, setContinentData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [COVIDParam, setCOVIDParam] = useState("Confirmed");
  const [chartData, setChartData] = useState(null);

  const continents = ["Africa", "Asia", "Europe", "Americas", "World"];
  const COVIDParams = ["Confirmed", "Deaths", "Recovered", "Critical"];

  useEffect(() => {
    const searchContinent = continent === "World" ? "" : continent;
    fetchCountriesInContinent(searchContinent)
      .then((countries) => {
        setCountries(countries.data);
        return countries.data;
      })
      .then((countries) => {
        const info = getContinentInfo(countries, globalInfo);
        setContinentData(info);
      });

    return () => {};
  }, [continent, globalInfo]);
  useEffect(() => {
    const data = getChartData();
    setChartData(data);

    return () => {};
  }, [continent, COVIDParam]);

  useEffect(() => {
    if (!globalInfo) {
      fetchGlobalInfo().then((response) => {
        console.log("global info", response);
        setGlobalInfo(response);
        return response;
      });
    }
    return () => {};
  }, []);

  const getChartData = () => {
    let dataSource = continent === "World" ? continentData : globalInfo;

    if (continentData || globalInfo) {
      const labels = [...dataSource.keys()];
      const data = [...dataSource.values()].map(
        (value) => value[COVIDParam.toLowerCase()]
      );
      return { data, labels };
    }
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
      {!(continentData && COVIDParam) ? (
        <Spinner />
      ) : (
        <Chart data={chartData} covidParam={COVIDParam} data2={continentData} />
      )}
      {COVIDParams &&
        COVIDParams.map((param) => (
          <Button
            key={param}
            text={param}
            onClick={() => {
              setCOVIDParam(param);
            }}
          />
        ))}
      <br />
      {continents &&
        continents.map((newContinent) => (
          <Button
            key={newContinent}
            text={newContinent}
            onClick={() => {
              setContinent(newContinent);
            }}
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
            onClick={() => getCountryData(continentData, country.name)}
            flagUrl={country.flagUrl}
          />
        ))
      )}
      {countryData && <div>{JSON.stringify(countryData)}</div>}
    </div>
  );
};

export default App;
