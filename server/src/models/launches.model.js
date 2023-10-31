const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["Space X", "Space Y"],
  upcoming: true,
  success: true,
}
const launchTwo = {
  flightNumber: 101,
  mission: "Kepler Exploration Y",
  rocket: "Explorer IS2",
  launchDate: new Date("June 17, 2025"),
  destination: "Kepler-1652 b",
  customers: ["Space A", "Space B"],
  upcoming: true,
  success: true,
 
}

launches.set(launch.flightNumber, launch)
launches.set(launchTwo.flightNumber, launchTwo)

function getAllLaunches() {
  return Array.from(launches.values())
}

module.exports = {
  getAllLaunches,
} 


