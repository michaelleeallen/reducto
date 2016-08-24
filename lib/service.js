const _ = require('lodash');
const utils = require('./utils');
const callService = require('./service-call');
const mapSchema = require('./map-schema');
const mapHeaders = require('./map-headers');

/**
 * Configure a service call and add its returned data to the local context.
 * @param {object} config - the route config object
 * @param {object} services - the services config object
 * @returns {function}
 */
module.exports = function (config, services) {
  return function service (req, res, next) {
    var parts = config.name.split(':');
    var serviceConfig = services[parts[1]][parts[0]];
    var session = _.merge({}, req.body, req.query, req.params, res.locals);
    var uri = utils.replaceStringTokens(session, serviceConfig.uri);
    var headers = mapHeaders(serviceConfig, req);
    var method = parts[0].toLowerCase();
    var serviceConfigOverrides = _.omitBy({method, uri, headers}, _.isUndefined);
    var requestConfig = _.merge({}, serviceConfig, serviceConfigOverrides);

    if (!_.isEmpty(req.body)) {
      requestConfig.json = req.body;
    }

    callService(requestConfig)
      .then(data => (config.dataSchema) ? mapSchema(config.dataSchema, data) : data)
      .then(data => {
        if (_.has(config, 'dataKey')) {
          res.locals[config.dataKey] = data;
        } else {
          _.assign(res.locals, data);
        }
        next();
      })
      .catch(next);
  };
};
