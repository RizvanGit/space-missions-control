const fs = require("fs")
const path = require("path")

const { parse } = require("csv-parse")

const habitablePlanets = []

function isHabitablePlanet(planet){
  var disposition = planet["koi_disposition"] === "CONFIRMED"
  var insol = planet["koi_insol"] > 0.36 && planet["koi_insol"] <1.11
  var radius = planet["koi_prad"] < 1.6

  return disposition && insol && radius
}

function loadPlanetsData () {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(parse({
        comment: "#",
        columns: true,
      }))
      .on("data", (data) => {
        if(isHabitablePlanet(data)){
          habitablePlanets.push(data)
        }
      })
      .on("error", (error) => {
        console.error("An error occurred! Error: ", error)
        reject(error)
      })
      .on("end", () => {
        resolve()
      })
  })
}

function getAllPlanets() {
  return habitablePlanets
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
