const request = require('request');

/**
 * Make a web service call to the configured endpoint.
 * @param {object} config - service config options(for request module)
 * @returns {Promise}
 */
module.exports = function(config){
  return new Promise((resolve, reject) => {
    request(config, (error, res, body) => {
      if (error) return reject(error);
      resolve(body);
    });
  });
};
