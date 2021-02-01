const SERVER_API_ROOT_URL = "http://localhost:5000";
const COUNTRIES_ROOT_URL = "restcountries.herokuapp.com/api/v1/";
const FLAGS_ROOT_URL = "https://www.countryflags.io/";
const CORONA_API_ROOT_URL = "https://corona-api.com/";
let covidData;

let currentCountryDataElem;
let currentCovidParam = "confirmed";
let currentContinent = "World";

const chartData = { data: [], labels: [] };
//dom elements
const spinnerElem = document.getElementsByClassName("spinner");
const contentElem = document.getElementById("content");
const chartElem = document.getElementById("chart-container");
const continentsContainerElem = document.getElementById("continents-container");
const covidParamsContainerElem = document.getElementById(
  "covid-params-container"
);
const countriesContainerElem = document.getElementById("countries-container");
const countryDataElem = document.getElementById("country-data");

function hideElements(elementsArr) {
  for (const element of elementsArr) {
    if (element.classList && ![...element.classList].includes("hide")) {
      element.classList.add("hide");
    }
  }
}
function showElements(elementsArr) {
  {
    for (const element of elementsArr) {
      if ([...element.classList].includes("hide")) {
        element.classList.remove("hide");
      }
    }
  }
}

function createButton(
  innerText,
  onClickFunction,
  dataAttrObj,
  innerChild = null
) {
  const button = document.createElement("button");
  button.classList.add(`button`);
  button.onclick = onClickFunction;
  button.innerText = innerText;
  if (dataAttrObj) {
    for (const [key, value] of Object.entries(dataAttrObj)) {
      button.dataset[key] = value;
    }
  }
  if (innerChild) button.appendChild(innerChild);
  return button;
}

function createImg(src, alt) {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  return img;
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createCountryDataElem(continent, country) {
  if (currentCountryDataElem) {
    removeAllChildNodes(countryDataElem);
  }
  countryDataElem.classList.add("selected-country-data");
  countryDataElem.dataset.country = country;
  Object.entries(covidData[continent][country]).forEach(([key, value]) => {
    const countryDataBox = document.createElement("div");
    const dataHeading = document.createElement("h3");
    dataHeading.innerText = key;
    const dataValue = document.createElement("p");
    dataValue.innerText = value;
    countryDataBox.appendChild(dataHeading);
    countryDataBox.appendChild(dataValue);
    countryDataElem.appendChild(countryDataBox);
  });

  return countryDataElem;
}

function updateChartData(selectedContinentsArr = null) {
  chartData.labels = [];
  chartData.data = [];
  if (selectedContinentsArr[0] === "World") {
    selectedContinentsArr = Object.keys(covidData);
  }
  for (const continent of selectedContinentsArr) {
    for (const [country, countryData] of Object.entries(covidData[continent])) {
      chartData.labels.push(country);
      chartData.data.push(countryData[currentCovidParam]);
    }
  }
  updateChartElem();
}

function createPanelButtons(
  parentElem,
  itemsArr,
  onClickfunction,
  dataAttr = null
) {
  for (const item of itemsArr) {
    const button = createButton(item, onClickfunction, { [dataAttr]: item });
    parentElem.appendChild(button);
  }
}

function showContinentOrCountryData(event) {
  console.log("clicked", event.target);

  const continent = event.target.dataset.continent;
  const country = event.target.dataset["country"];
  const covidParam = event.target.dataset["covidParam"];

  if (continent === "World") {
    currentContinent = continent;
    updateChartData(Object.keys(covidData), currentCovidParam);
    showElements([chartElem]);
    showElements(filterContinentButtonGroup());
    currentCountryDataElem ? hideElements([currentCountryDataElem]) : null;
    return;
  } else if (continent && !country) {
    currentContinent = continent;
    updateChartData([currentContinent], currentCovidParam);
    showElements([chartElem]);
    currentCountryDataElem ? hideElements([currentCountryDataElem]) : null;
    hideElements(filterContinentButtonGroup());
    showElements(filterContinentButtonGroup(continent));
    return;
  } else if (covidParam) {
    currentCovidParam = covidParam;

    updateChartData([currentContinent], covidParam);
    showElements([chartElem]);
    currentCountryDataElem ? hideElements([currentCountryDataElem]) : null;
    return;
  } else if (country) {
    currentCountryDataElem = createCountryDataElem(continent, country);
    hideElements([chartElem]);
    showElements([currentCountryDataElem]);
  }
}

//creates the container div that holds all coutry buttons
function createContinentButtonsPanel(continent) {
  const continentPanelElem = document.createElement("div");
  continentPanelElem.dataset.continent = continent;
  // continentPanelElem.classList.add("hide");
  return continentPanelElem;
}

function filterContinentButtonGroup(continent = null) {
  const selector = continent
    ? `div[data-continent=${continent}]`
    : `div[data-continent`;
  return document.querySelectorAll(selector);
}

//created the country buttons in the continentsButtonsPanel
function createCountryButton(continent, country) {
  const img = createImg(covidData[continent][country].flagUrl, country);
  const button = createButton(
    country,
    showContinentOrCountryData,
    { continent: continent, country: country },
    img
  );
  button.appendChild(img);
  return button;
}

function createCountryButtonElements() {
  for (const [continent, continentData] of Object.entries(covidData)) {
    const continentPanelElem = createContinentButtonsPanel(continent);
    for (const [countryName, countryData] of Object.entries(continentData)) {
      const button = createCountryButton(continent, countryName);
      continentPanelElem.appendChild(button);
    }
    countriesContainerElem.appendChild(continentPanelElem);
  }
}

function getCountries() {
  var cors_api_url = "https://cors-anywhere.herokuapp.com/";
  function doCORSRequest(options, printResult) {
    debugger;
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    console.log(x);
    x.onload = x.onerror = function () {
      printResult(
        options.method +
          " " +
          options.url +
          "\n" +
          x.status +
          " " +
          x.statusText +
          "\n\n" +
          (x.responseText || "")
      );
    };
  }

  doCORSRequest(
    {
      method: "GET",
      url: "https://" + COUNTRIES_ROOT_URL,
    },
    function printResult(result) {
      outputField.value = result;
    }
  );
}

const fetchGlobalInfo = () => {
  const globalInfo = fetch(`${SERVER_API_ROOT_URL}/api/collect`)
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      console.log("covidData", res);
      covidData = res;
      updateChartData(Object.keys(covidData), "confirmed");
      const continents = [...Object.keys(covidData)];
      const covidDataParams = [
        "confirmed",
        "critical",
        "deaths",
        "new_deaths",
        "new_confirmed",
        "recovered",
      ];
      hideElements([spinnerElem]);
      showElements([contentElem]);
      createPanelButtons(
        continentsContainerElem,
        continents,
        showContinentOrCountryData,
        "continent"
      );
      createPanelButtons(
        covidParamsContainerElem,
        covidDataParams,
        showContinentOrCountryData,
        "covidParam"
      );
      createCountryButtonElements();
    })
    .catch((err) => console.error(err));
  console.log(globalInfo);
  return globalInfo;
};

function createCountriesButtons(globalInfo) {
  const continents = Object.keys(globalInfo);
  for (const continent in continents) {
    const countries = Object.keys(continent);
  }
}
function updateChartElem() {
  ///chart
  const ctx = document.getElementById("covid-chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: `${currentCovidParam} in ${currentContinent}`,
          data: chartData.data,
          backgroundColor: "rgba(153, 102, 255, 0.2)",

          borderColor: "rgba(255, 159, 64, 1)",

          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

fetchGlobalInfo();
getCountries();
