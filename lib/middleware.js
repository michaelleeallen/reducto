const utils = require('./utils');

/**
 * Retrieve a middleware function.
 * @param {object} config - route config
 * @returns {function}
 * @throws TypeError
 */
module.exports = function(config){
  return utils.lookupFn(config.path);
};
