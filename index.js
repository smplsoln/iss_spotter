// index.js
const { nextISSTimesForMyLocation } = require('./iss');
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
}); */

/* let ipAddr = '8.8.8.8';

fetchCoordsByIP(ipAddr, (error, geoCoord) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned Geo coordinates:', geoCoord);
});

let latitude = 50.4481;
let longitude = -104.6126;
fetchISSFlyOverTimes({ latitude, longitude }, (error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned ISS Passes:', ip);
}); */



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  let passArr = JSON.parse(passTimes);
  for (const pass of passArr) {
    let dateStr = Date(pass.risetime);
    let duration = pass.duration;
    const passStr = `Next pass at ${dateStr} for ${duration} seconds!`;
    console.log(passStr);
  }
});