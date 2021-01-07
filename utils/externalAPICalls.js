const axios = require("axios");

const getCountries = (continent) => {
  const countries = axios
    .get(`https://restcountries.herokuapp.com/api/v1/region/${continent}`)
    .then((rawlist) => {
      const countries = rawlist.data.map((item) => {
        return {
          name: item.name.common,
          code: item.cca2,
          flagUrl: `https://www.countryflags.io/${item.cca2}/flat/32.png`,
        };
      });
      console.log(countries);
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};
const getCountriesInfo = (country) => {
  const countryInfo = axios
    .get(`https://corona-api.com/countries`)
    .then((rawlist) => {
      const countryInfo = rawlist.data.data.filter(
        (item) => item.name === country
      );
      console.log(countryInfo);
      return countryInfo;
    })
    .catch((err) => console.error(err));
  return countryInfo;
};
getCountriesInfo("Afghanistan");

module.exports = {
  getCountries,
};
