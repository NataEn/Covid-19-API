const COUNTRIES_ROOT_URL = "https://restcountries.herokuapp.com/api/v1/";
const CORONA_API_ROOT_URL = "https://corona-api.com/";
const NODE_ENV_SERVER_API_ROOT_URL = "http://localhost:5000/api";

const fetchCountriesInContinent = (continent = null) => {
  const fields = continent ? `?continent=${continent}` : "";
  const countries = fetch(`${NODE_ENV_SERVER_API_ROOT_URL}${fields}`)
    .then((response) => {
      const countries = response.json();
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};

const corsRestricted_FetchCountriesInContinent = (continent = null) => {
  const fields = continent ? `region/${continent}` : "";
  const countries = fetch(`${COUNTRIES_ROOT_URL}${fields}`)
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
  return countries;
};

const fetchGlobalInfo = () => {
  const globalInfo = fetch(`${CORONA_API_ROOT_URL}/countries`)
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => console.error(err));
  return globalInfo;
};
const getCountryInfo = (continentInfo, country) => {
  return continentInfo.filter((item) => item.name === country);
};

const getContinentInfo = (countries, globalInfo) => {
  const continentInfoMap = new Map();

  if (globalInfo) {
    for (const continentCountry of countries) {
      globalInfo.forEach((country) => {
        if (country.name === continentCountry.name) {
          console.log(country);
          return continentInfoMap.set(country.name, {
            ...country.latest_data,
            ...{
              today_confirmed: country.today.confirmed,
              today_deaths: country.today.deaths,
            },
          });
        }
      });
    }
  }
  return continentInfoMap;
};

module.exports = {
  getCountryInfo,
  fetchGlobalInfo,
  fetchCountriesInContinent,
  getContinentInfo,
};
