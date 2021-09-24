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
      callback(Error(msg), null);
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

module.exports = { fetchMyIP };