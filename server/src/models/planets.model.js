const fs = require("fs");
const path = require("path");
const planets = require("./planets.mongo");

const { parse } = require("csv-parse");

function isHabitablePlanet(planet) {
  var disposition = planet["koi_disposition"] === "CONFIRMED";
  var insol = planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11;
  var radius = planet["koi_prad"] < 1.6;

  return disposition && insol && radius;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv"),
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        }),
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.error("An error occurred! Error: ", error);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`Habitable planets founded: ${countPlanetsFound}`)
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}, {"_id": 0, "__v": 0});
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      },
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
