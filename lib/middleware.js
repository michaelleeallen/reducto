var utils = require('./utils');

/**
 * Maps a configured middleware function.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(config){
  if ( config.middleware ) {
    return config.middleware.map(utils.lookupFn);
  }
  return null;
};
