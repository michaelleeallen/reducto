var request = require('request');

/**
 * Make a web service call to the configured endpoint. Expects
 * the returned data to be in JSON format.
 * @param {object} opts - request options['url', 'headers', 'method']
 * @param {object} session
 * @returns {Promise}
 */
module.exports = function(opts){
  return new Promise((resolve, reject) => {
    request(opts, (error, res, body) => {
      if (error) return reject(error);
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
};
