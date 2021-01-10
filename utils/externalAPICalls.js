const axios = require("axios");

const getCountries = (continent = null) => {
  const fields = continent ? `region/${continent}` : "";

  const countries = axios
    .get(`https://restcountries.herokuapp.com/api/v1/${fields}`)
    .then((rawlist) => {
      const countries = rawlist.data.map((item) => {
        return {
          name: item.name.common,
          code: item.cca2,
          flagUrl: `https://www.countryflags.io/${item.cca2}/flat/32.png`,
        };
      });
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};
const getGlobalInfo = () => {
  const globalInfo = axios
    .get(`https://corona-api.com/countries`)
    .then((response) => {
      console.log(response.data);
      return "data";
    })
    .catch((err) => console.err(err));
  return globalInfo;
};
//if you have global info than its an sync method,
//if there is no global info than it an async method
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
};
