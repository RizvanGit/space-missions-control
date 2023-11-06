const launchesDatabase = require("./launches.mongo");
const planets = require('./planets.mongo')

async function getLatestFlightNumber(){
  const latestLaunch = await launchesDatabase
    .findOne({})
    .sort('-flightNumber');

  if(!latestLaunch){
    return 100
  }

  return latestLaunch.flightNumber
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  
  const planet = await planets.findOne({
    keplerName: launch.destination,
  });
  
  if(!planet){
    throw new Error('No matching planet was found!')
  }
  
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    },
  );
}

async function scheduleNewLaunch(launch) {

  const newFlightNumber = await getLatestFlightNumber() + 1;
  
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Space X", "Space Y"],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId
  });
}

async function abortLaunchById(launchId) {

  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId,
  }, {
      upcoming: false,
      success: false
    })
  
  return aborted;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
