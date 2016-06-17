const utils = require('./utils');

/**
 * Retrieve a middleware function.
 * @param {object} config - route config
 * @returns {function}
 * @throws TypeError
 */
module.exports = (config) => utils.lookupFn(config.path);