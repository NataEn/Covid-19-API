const axios = require("axios");
const COUNTRIES_ROOT_URL = "https://restcountries.herokuapp.com/api/v1/";
const FLAGS_ROOT_URL = "https://www.countryflags.io/";
const CORONA_API_ROOT_URL = "https://corona-api.com/";

const getCountries = (continent = null) => {
  const fields = continent ? `region/${continent}` : "";
  const countries = axios
    .get(`${COUNTRIES_ROOT_URL}${fields}`)
    .then((rawlist) => {
      return rawlist.data;
    })
    .catch((err) => console.error(err));
  return countries;
};
const getCountriesWithFlags = (continent = null) => {
  const fields = continent ? `region/${continent}` : "";
  const countries = axios
    .get(`${COUNTRIES_ROOT_URL}${fields}`)
    .then((rawlist) => {
      const countries = rawlist.data.map((item) => {
        return {
          name: item.name.common,
          code: item.cca2,
          flagUrl: `${FLAGS_ROOT_URL}${item.cca2}/flat/32.png`,
        };
      });
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};

const getGlobalInfo = () => {
  const globalInfo = axios
    .get(`${CORONA_API_ROOT_URL}countries`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.err(err));
  return globalInfo;
};

const addCountryCovidData = (globalCovidInfo, continentInfoMap, continent) => {
  const exsistingCountries = Object.keys(continentInfoMap[continent]);
  globalCovidInfo.data.forEach((country) => {
    if (exsistingCountries.includes(country.name)) {
      const countryData = continentInfoMap[continent][country.name];

      continentInfoMap[continent][country.name] = {
        ...countryData,
        ...{
          confirmed: country.latest_data.confirmed,
          new_confirmed: country.today.confirmed,
          deaths: country.latest_data.deaths,
          new_deaths: country.today.deaths,
          recovered: country.latest_data.recovered,
          critical: country.latest_data.critical,
          updated_at: country.updated_at,
        },
      };
    }
  });
};
const addCountryData = (countries, continentInfoMap) => {
  countries.forEach((country) => {
    const continent = country.region ? country.region : "Others";
    if (!continentInfoMap[continent]) {
      continentInfoMap[continent] = {};
    }
    continentInfoMap[continent][country.name.common] = {
      code: country.cca2,
      flagUrl: `${FLAGS_ROOT_URL}${country.cca2}/flat/32.png`,
    };
  });
};
const getContinentInfo = ([countries, globalCovidInfo]) => {
  const continentInfoMap = {};
  if (countries) {
    addCountryData(countries, continentInfoMap);
  }
  for (const continent of Object.keys(continentInfoMap)) {
    if (globalCovidInfo) {
      addCountryCovidData(globalCovidInfo, continentInfoMap, continent);
    }
  }

  return continentInfoMap;
};

const collectInfo = () => {
  const countriesPromise = getCountries();
  const infoPromise = getGlobalInfo();

  const info = Promise.all([countriesPromise, infoPromise])
    .then((response) => {
      return getContinentInfo(response);
    })
    .catch((err) => console.error(err));
  return info;
};

const getCountriesInfo = (country, ...globalInfo) => {
  if (!globalInfo) {
    getGlobalInfo()
      .then((response) => response.filter((item) => item.name === country))
      .catch((err) => console.error(err));
  } else {
    return globalInfo.filter((item) => item.name === country);
  }
};

module.exports = {
  getCountriesInfo,
  getGlobalInfo,
  getCountries,
  getCountriesWithFlags,
  collectInfo,
};
