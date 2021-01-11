const fetchCountriesInContinent = (continent = null) => {
  const fields = continent ? `?continent=${continent}` : "";
  const countries = fetch(`http://localhost:5000/api${fields}`)
    .then((response) => {
      const countries = response.json();
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};

const fetchGlobalInfo = () => {
  const globalInfo = fetch(`https://corona-api.com/countries`)
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => console.error(err));
  return globalInfo;
};
const getCountryInfo = (continentInfo, country) => {
  return continentInfo.filter((item) => item.name === country);
};
//if you have global info than its an sync method,
//if there is no global info than it an async method
const getContinentInfo = (countries, globalInfo) => {
  // const countriesInfo = globalInfo.map((country) => {
  //   const name = country.name;
  //   const data = country.latest_data;
  //   const item = { [name]: data };
  //   console.log({ [name]: data });
  //   return item;
  // });
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
