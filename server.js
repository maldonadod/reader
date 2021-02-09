const path = require("path");
const express = require("express");

const app = express();

app.get("/dados", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

const listening = () => console.log("listening to port " + process.env.PORT)

app.listen(process.env.PORT, listening)