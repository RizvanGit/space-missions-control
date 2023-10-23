const API_URL = "http://localhost:8000"

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  const planetsData = await response.json()
  return planetsData
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const launchesData = await response.json()
  return launchesData.sort((a,b) => a.flightNumber - b.flightNumber)
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
