const path = require("path");
const express = require("express");

const app = express();

app.get("/dados", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const listening = () => console.log("listening to port 3000")

app.listen(process.env.PORT, listening)