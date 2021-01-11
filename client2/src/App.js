import { useEffect, useState } from "react";
import CountriesButtons from "./components/CountriesButtons";
import Chart from "./components/Chart";
import {
  fetchCountriesInContinent,
  getCountryInfo,
  fetchGlobalInfo,
  getContinentInfo,
} from "./utils/apiCalls";
import "./App.css";
const continents = ["Africa", "Asia", "Europe", "Americas", "World"];

function App() {
  const [countriesLoaded, setCountriesLoaded] = useState(false);
  const [covidDataLoaded, setCovidDataLoaded] = useState(false);
  const [covidData, setCovidData] = useState(null);

  const [worldCountries, setWorldCountries] = useState(null);
  const [countries, setCountries] = useState(null);
  const [continent, setContinent] = useState(null);
  const [globalInfo, setGlbalInfo] = useState(null);

  useEffect(() => {
    fetchCountriesInContinent()
      .then((countries) => {
        console.log(countries.data);
        setCountries(countries.data);
        setWorldCountries(countries.data);
        setCountriesLoaded(true);
        return countries.data;
      })
      .then((countries) =>
        fetchGlobalInfo().then((response) => {
          const info = getContinentInfo(countries, response);
          setGlbalInfo(info);
          return info;
        })
      )
      .then((covidData) => {
        setCovidData(covidData);
        setCovidDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    if ((!covidDataLoaded || !countriesLoaded) && globalInfo) {
      fetchCountriesInContinent(continent)
        .then((countries) => {
          const continentCountries = countries.data;
          console.log("changed", continentCountries);
          setCountries(continentCountries);
          setCountriesLoaded(true);
          return continentCountries;
        })
        .then((continentCountries) => {
          const continentInfoMap = new Map();
          if (globalInfo) {
            for (const continentCountry of continentCountries) {
              continentInfoMap.set(
                continentCountry.name,
                globalInfo.get(continentCountry.name)
              );
            }
          }
          return continentInfoMap;
        })
        .then((covidData) => {
          setCovidData(covidData);
          setCovidDataLoaded(true);
        });
    }
  }, [continent, globalInfo]);

  return (
    <div className="App">
      {covidDataLoaded && countriesLoaded ? (
        <Chart covidData={covidData} setCovidDataLoaded={setCovidDataLoaded} />
      ) : (
        "Loading"
      )}
      <br />

      {continents.map((newContinent) => (
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
      ))}
      <br />

      {countriesLoaded ? <CountriesButtons countries={countries} /> : "Loading"}
    </div>
  );
}
export default App;
