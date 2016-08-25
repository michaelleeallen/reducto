const _ = require('lodash');
const batch = require('./batch');

/**
 * Allows a list of objects from one service call to be used as
 * context for downstream service calls.
 * @param {object} config - route config
 * @param {object} services - services config
 * @returns {function} middleware
 */
module.exports = (config, services) => (req, res, next) => {
  var list = _.get(res.locals, config.key, []);
  var _services = list.map(obj => Object.assign({ type: 'service', context: obj }, config.service));
  batch({services: _services}, services)(req, res, next);
};
