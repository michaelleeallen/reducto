var Q = require('q');
var request = require('request');
/**
 * Make a web service call to the configured endpoint. Expects
 * the returned data to be in JSON format. 
 * @param {object} opts - request options['url', 'headers', 'method']
 * @param {object} session
 * @returns {Promise}
 */
module.exports = function(opts){
  var defered = Q.defer();
  request(opts, function(error, res, body){
    if ( error ) return defered.reject(error);
    defered.resolve(JSON.parse(body));
  });
  return defered.promise;
};