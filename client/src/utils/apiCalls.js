const continents = ["Africa", "Asia", "Europe", "America", "World"];
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
const getCountyInfo = async (country) => {
  const info = await getGlobalInfo();
  //   const countries = await getCountries(continent);
  console.log(info.filter((item) => item.name === country));
  return info.filter((item) => item.name === country);
};
//if you have global info than its an sync method,
//if there is no global info than it an async method
const getCountriesInfo = async (continent) => {
  const info = await getGlobalInfo();
  return null;
};
// console.log(getCountriesInfo("asia", "Afganistan"));
// console.log(getCountries("asia"));
// console.log(getCountyInfo("Afghanistan"));
console.log(getCountriesInContinent("asia"));
module.exports = {
  getCountyInfo,
  getCountriesInContinent,
};
