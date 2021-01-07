require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");

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

//routing
app.get("/", (req, res) => {
  res.render("index", { name: "1234" });
});
app.get("/api", (req, res) => {
  res.send("Hello World! from api");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
