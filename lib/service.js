var _ = require('lodash');
var utils = require('./utils');
var callService = require('./service-call');
var pathval = require('pathval');

/**
 * Configure a service call and add its returned data to the local context.
 * You must use some form of request body parser to send POST data.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(configs, services) {
  return function(req, res, next){
    var calls = _.map(configs, (conf) => {
      var parts = conf.name.split(':');
      var serviceConfig = services[parts[1]][parts[0]];
      var session = Object.assign({}, req.query, req.params);
      var uri = utils.replaceStringTokens(session, serviceConfig.uri);
      var requestConfig = Object.assign({
        method: parts[0].toLowerCase()
      }, serviceConfig, {uri});
      
      if ( !_.isEmpty(req.body) ) {
        requestConfig.json = req.body;
      }
      
      return callService(requestConfig)
        .then((data) => {
          if (conf.dataMap) {
            return _.mapValues(conf.dataMap, p => pathval.get(data, p));
          } else {
            return data;
          }
        });
    });
    
    Promise.all(calls)
      .then((responses) => {
        res.locals = responses.reduce((r, c) => Object.assign(r, c), {});
        next();
      })
      .catch(next);
  };
};
