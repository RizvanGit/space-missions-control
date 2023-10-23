const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8000",
  "[::1]:8000",
  "http://127.0.0.1:8000",
];

const corsOptionsDelegate = function (req, callback) {
  const origin = req.header("Origin");
  const corsOptions = { origin: false };

  if (whitelist.indexOf(origin) !== -1) {
    corsOptions.origin = true;
  }

  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.use(launchesRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
