import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContinentsButtons from "./components/ContinentsButtons";
import CountriesButtons from "./components/CountriesButtons";
import Chart from "./components/Chart";
import Spinner from "./components/Spinner";
import CountryData from "./components/CountryData";

import {
  fetchCountriesInContinent,
  getCountryInfo,
  fetchGlobalInfo,
  getContinentInfo,
} from "./utils/apiCalls";

import "./App.css";

const CONTINENTS = ["Africa", "Asia", "Europe", "Americas", "World"];

function App() {
  const [countriesLoaded, setCountriesLoaded] = useState(false);
  const [covidDataLoaded, setCovidDataLoaded] = useState(false);
  const [covidData, setCovidData] = useState(null);
  const [worldCountries, setWorldCountries] = useState(null);
  const [countries, setCountries] = useState(null);
  const [continent, setContinent] = useState(null);
  const [globalInfo, setGlbalInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  useEffect(() => {
    fetchCountriesInContinent()
      .then((countries) => {
        setCountries([...countries.data]);
        // setWorldCountries([...countries.data]);
        setCountriesLoaded(true);
        return countries.data;
      })
      .then((countries) =>
        fetchGlobalInfo().then((response) => {
          const info = getContinentInfo(countries, response);
          setGlbalInfo(new Map(info));
          return info;
        })
      )
      .then((covidData) => {
        setCovidData(new Map(covidData));
        setCovidDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    const createContinentInfoMap = (continentCountries) => {
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
    };

    if ((!covidDataLoaded || !countriesLoaded) && globalInfo) {
      fetchCountriesInContinent(continent)
        .then((countries) => {
          const continentCountries = countries.data;
          setCountries([...continentCountries]);
          setCountriesLoaded(true);
          return continentCountries;
        })
        .then((continentCountries) =>
          createContinentInfoMap(continentCountries)
        )
        .then((covidData) => {
          setCovidData(new Map(covidData));
          setCovidDataLoaded(true);
        });
    }
  }, [continent, globalInfo]);

  useEffect(() => {
    if (globalInfo) {
      setSelectedCountryData(
        Object.assign({}, globalInfo.get(selectedCountry))
      );
    }
  }, [selectedCountry, globalInfo]);

  return (
    <Router>
      <div className="App">
        <h1>COVID Data In {continent ? continent : "World"}</h1>
        <Switch>
          <Route path="/" exact>
            {covidDataLoaded && countriesLoaded ? (
              <Chart
                covidData={covidData}
                setCovidDataLoaded={setCovidDataLoaded}
              />
            ) : (
              <Spinner />
            )}
            <br />
          </Route>
          <Route path="/:country">
            {selectedCountry && (
              <CountryData data={selectedCountryData} continent={continent} />
            )}
          </Route>
        </Switch>

        <ContinentsButtons
          setCovidDataLoaded={setCovidDataLoaded}
          setCountriesLoaded={setCountriesLoaded}
          setContinent={setContinent}
        />
        <br />

        {countriesLoaded ? (
          <CountriesButtons
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </Router>
  );
}
export default App;
