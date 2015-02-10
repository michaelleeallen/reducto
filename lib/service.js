var _ = require('lodash');
var utils = require('./utils');
var callService = require('./service-call');

/**
 * Configure a service call and add its returned data to the local context.
 * You must use some form of request body parser to send POST data.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(config, services){
  var parts = config.name.split(':');
  var svc = services[parts[1]][parts[0]];

  return function(req, res, next){
    var requestConfig = _.clone(svc);
    var session = _.extend({}, req.query, req.params);
    if ( !_.isEmpty(req.body) ) {
      requestConfig.json = req.body;
    }
    requestConfig.method = parts[0].toLowerCase();
    requestConfig.uri = utils.replaceStringTokens(session, svc.uri);
    callService(requestConfig).then(
      function(data){
        _.extend(res.locals, data);
        next();
      }, next);
  };
};
