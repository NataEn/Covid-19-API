require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();

const port = process.env.PORT || 5000;
const static = process.env.STATIC_PATH || path.join(__dirname, "../public");
console.log(__dirname);

app.use("/", express.static(static));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
