const getCountries = () => {
  const countries = fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((rawList) => {
      const countries = rawList.map((item) => {
        return {
          name: item.name,
          code: item.alpha2Code,
          flagUrl: `https://www.countryflags.io/${item.alpha2Code}/flat/32.png`,
        };
      });
      return countries;
    });

  return countries;
};

module.exports = {
  getCountries,
};
