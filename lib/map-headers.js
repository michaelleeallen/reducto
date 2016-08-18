/**
 * Map header values from a config object, or from incoming request headers.
 * @module map-headers
 * @param {object} config - a middleware config object
 * @param {HTTPRequest} req - the incoming request object
 * @returns {object?} produces the headers object or undefined
 */
module.exports = function (config, req) {
  if (config.headers) {
    return Object.keys(config.headers)
      .reduce((result, key) => {
        if (config.headers[key] === 'FROM_REQUEST') {
          if (!req.headers || !req.headers[key]) {
            throw new TypeError(`Missing required request header: ${key}.`);
          } else {
            result[key] = req.headers[key];
          }
        } else {
          result[key] = config.headers[key];
        }
        return result;
      }, {});
  }
};
