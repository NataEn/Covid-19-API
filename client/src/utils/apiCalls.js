const getCountriesInContinent = (continent) => {
  const countries = fetch(`http://localhost:5000/api?continent=${continent}`)
    .then((response) => {
      const countries = response.json();
      console.log(countries);
      return countries;
    })
    .catch((err) => console.error(err));
  return countries;
};

const getGlobalInfo = () => {
  const globalInfo = fetch(`https://corona-api.com/countries`)
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => console.error(err));
  return globalInfo;
};
const getCountyInfo = async (country, globalInfo) => {
  return globalInfo.filter((item) => item.name === country);
};
//if you have global info than its an sync method,
//if there is no global info than it an async method
const getCountriesInfo = (countries, globalInfo) => {
  console.log("in getCountriesData", countries);
  // const countriesMap = new Map(
  //   countries.map((country) => [country.name, country.flagUrl])
  // );
  const countriesInfoMap = globalInfo.map((country) => {
    const name = country.name;
    const data = country.latest_data;
    const item = { [name]: data };
    console.log({ [name]: data });
    return item;
  });
  const countriesCovidData = new Map();
  // countries.map((country) =>
  //   countriesCovidData.set(
  //     country.name,
  //     countriesInfoMap.get(country.name).latest_data
  //   )
  // );

  return countriesInfoMap;
};

module.exports = {
  getCountyInfo,
  getGlobalInfo,
  getCountriesInContinent,
  getCountriesInfo,
};
