const _ = require('lodash');
const utils = require('./utils');
const callService = require('./service-call');
const pathval = require('pathval');
const mapSchema = require('./map-schema');

/**
 * Configure a service call and add its returned data to the local context.
 * You must use some form of request body parser to send POST data.
 * @param {object} config - the route config object
 * @param {object} services - the services config object
 * @returns {function}
 */
module.exports = function(config, services) {

  /**
   * @returns {Promise}
   */
  return function service(req, res, next){
    var parts = config.name.split(':');
    var serviceConfig = services[parts[1]][parts[0]];
    var session = Object.assign({}, req.body, req.query, req.params);
    var uri = utils.replaceStringTokens(session, serviceConfig.uri);
    var requestConfig = Object.assign({
      method: parts[0].toLowerCase()
    }, serviceConfig, {uri});

    if ( !_.isEmpty(req.body) ) {
      requestConfig.json = req.body;
    }

    return callService(requestConfig)
      .then((data) => {
        if (config.dataSchema) {
          return mapSchema(config.dataSchema, data);
        } else {
          return data;
        }
      });
  };
};
