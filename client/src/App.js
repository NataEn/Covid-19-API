import "./App.css";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import DataChart from "./components/DataChart";
import { useEffect, useState } from "react";
import {
  fetchCountriesInContinent,
  getCountryInfo,
  fetchGlobalInfo,
  getContinentInfo,
} from "./utils/apiCalls";

const continents = ["Africa", "Asia", "Europe", "Americas", "World"];
const COVIDParams = ["Confirmed", "Deaths", "Recovered", "Critical"];

const App = () => {
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countriesLoaded, setCountriesLoaded] = useState(false);
  const [chartDataLoaded, setchartDataLoaded] = useState(false);

  const [globalInfo, setGlobalInfo] = useState(null);
  const [continent, setContinent] = useState("World");
  const [continentData, setContinentData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [COVIDParam, setCOVIDParam] = useState("Confirmed");
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [buttonsLoading, setButtonsLoading] = useState(true);

  // useEffect(() => {
  //   fetchGlobalInfo().then((resp) => {
  //     setDataLoaded(true);
  //     setData({
  //       COVIDData: [...resp.values()],
  //       labels: [...resp.keys()],
  //     });
  //   });
  // }, []);

  useEffect(() => {
    // fetchGlobalInfo()
    //   .then((response) => {
    //     setGlobalInfo(response);
    //     return response;
    //   })
    //   .then(() => fetchCountriesInContinent("World"))
    //   .then((countries) => {
    //     console.log(countries.data);
    //     setCountries(countries.data);
    //     setCountriesLoaded(true);
    //     setCOVIDParam("Confirmed");
    //     setContinent("world");
    //     return countries.data;
    //   });
  }, []);

  useEffect(() => {
    // function getChartData() {
    //   if (continentData) {
    //     const labels = [...continentData.keys()];
    //     const COVIDData = [...continentData.values()].map(
    //       (value) => value[COVIDParam.toLowerCase()]
    //     );
    //     return { COVIDData, labels };
    //   }
    // }
    // const searchContinent = continent === "World" ? "" : continent;
    // fetchCountriesInContinent(searchContinent).then((countries) => {
    //   // setDataLoaded(true)
    //   setCountries(countries.data);
    //   return countries.data;
    // });
    // const data = getChartData();
    // setChartData(data);
  }, [continent, COVIDParam, continentData]);

  // const getCountryData = (countryName) => {
  //   console.log(countryName);
  //   const data = continentData.get(countryName);
  //   setCountryData(data);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID 19 {continent} Data</h1>
      </header>
      <DataChart />
      {/* {dataLoaded ? (
        <Chart
          chartData={data}
          covidParam={COVIDParam}
          // data2={continentData}
        />
      ) : (
        "LOADING DATA"
      )} */}

      {/* {chartDataLoaded ? (
        <Spinner />
      ) : (
        <Chart
          chartData={chartData}
          covidParam={COVIDParam}
          // data2={continentData}
        />
      )} */}

      {COVIDParams &&
        COVIDParams.map((param) => (
          <Button
            key={param}
            text={param}
            onClick={() => {
              setCOVIDParam(param);
              setchartDataLoaded(false);
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
              setchartDataLoaded(false);
            }}
          />
        ))}
      <br />
      {/* {countriesLoaded ? (
        <Spinner />
      ) : (
        countries.map((country) => (
          <Button
            key={country.name}
            text={country.name}
            onClick={() => {
              // getCountryData(country.name);
            }}
            flagUrl={country.flagUrl}
          />
        ))
      )} */}
    </div>
  );
};

export default App;
