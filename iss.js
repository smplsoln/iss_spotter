const request = require('request');


// curl 'https://api.ipify.org?format=json'
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  let uri = 'https://api.ipify.org/?format=json';

  request(uri, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    if (!body || body === "") {
      callback(new Error('IP not found: nothing returned!'));
      return;
    }

    let ipObj = JSON.parse(body);
    let ipAddr = ipObj.ip;
    callback(null, ipAddr);
  });
};

/**
 *
 * @param {String} ip : ip address whose geo-coordinates to find
 * @param {Function} callback : (error, coordinates) => { } : Handler function that will called with the result.
 * Either error of the goe-coordinates of the ip address will be passed to it.
 */
const fetchCoordsByIP = function(ip, callback) {

  let uri = `https://freegeoip.app/json/${ip}`;
  request(uri, (err, resp, body) => {

    if (err) {
      callback(err, null);
      return;
    }

    // if non-200 status, assume server error
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching geo coordinates by IP ${ip}. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    if (!body || body === "") {
      callback(new Error(`Geo coordinates not found for IP ${ip} : nothing returned!`));
      return;
    }

    let geoObj = JSON.parse(body);
    let latitude = geoObj.latitude;
    let longitude = geoObj.longitude;
    let latLngObj = { latitude, longitude };
    let passes = JSON.stringify(latLngObj);

    callback(null, passes);
  });
};



// https://iss-pass.herokuapp.com/json/?lat=50.4481&lon=-104.6126


const fetchISSFlyOverTimes = function({latitude, longitude}, callback) {

  let uri = `https://isooooos-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(uri, (err, resp, body) => {

    if (err) {
      callback(err, null);
      return;
    }

    // if non-200 status, assume server error
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching ISS passs for latitude: ${latitude}, longitude ${longitude}. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    if (!body || body === "") {
      callback(new Error(`ISS passs not found for latitude: ${latitude}, longitude ${longitude} : nothing returned!`));
      return;
    }

    let bodyObj = JSON.parse(body);
    let respArr = bodyObj.response;
    let passes = JSON.stringify(respArr);

    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };