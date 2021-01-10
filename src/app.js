require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const { getCountries } = require("../utils/externalAPICalls");

const app = express();

//express config data
const port = process.env.PORT || 5000;
const static = process.env.STATIC_PATH || path.join(__dirname, "../public");
const partialsPath =
  process.env.PARTIALS_PATH || path.join(__dirname, "../views/partials");

//view engin and location setting
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//static files and assets
app.use("/", express.static(static));
app.use(
  "/scripts",
  express.static(path.join(__dirname, "../node_modules/chart.js/dist"))
);
//setting cors temporary
app.use(cors());

//routing
app.get("/", async (req, res, next) => {
  const countries = await getCountries("asia");
  res.render("index", {
    countries: countries,
    name: "123",
    continents: ["Africa", "Asia", "Europe", "America", "World"],
  });
});
app.get("/api", async (req, res, next) => {
  const { continent } = req.query;
  let countries;
  if (continent) {
    countries = await getCountries(continent);
    console.log(countries);
  } else {
    countries = await getCountries();
  }
  res.json({ data: countries });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
