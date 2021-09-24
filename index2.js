// const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');


/* fetchMyIp().then((ip) => {
  console.log({ip});
}).catch((error) => {
  console.log(error);
}); */

/* let ipbody = { 'ip': '8.8.8.8' };
let ipJson = JSON.stringify(ipbody);

fetchCoordsByIP(ipJson).then((body) => {
  // console.log(body);
  let geoObj = JSON.parse(body);
  let latitude = geoObj.latitude;
  let longitude = geoObj.longitude;
  let latLngObj = { latitude, longitude };
  console.log({ latLngObj });
}).catch((error) => {
  console.log(error);
}); */

/* let latitude = 37.751;
let longitude = -97.822;
let loc = { latitude, longitude };
let locJson = JSON.stringify(loc);

fetchISSFlyOverTimes(locJson).then((body) => {
  // console.log(body);
  let passObj = JSON.parse(body);
  let passArr = passObj.response;
  for (const pass of passArr) {
    let dateStr = Date(pass.risetime);
    let duration = pass.duration;
    const passStr = `Next pass at ${dateStr} for ${duration} seconds!`;
    console.log(passStr);
  }
}).catch((err) => {
  console.log(err);
}); */

let printPassTimes = function(body) {
  // console.log({body});
  for (const pass of body) {
    let dateStr = Date(pass.risetime);
    let duration = pass.duration;
    const passStr = `Next pass at ${dateStr} for ${duration} seconds!`;
    console.log(passStr);
  }
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  }).catch((err) => {
    console.log(err);
  });