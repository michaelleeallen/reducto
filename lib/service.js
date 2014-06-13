var _ = require('underscore');
var utils = require('./utils');
var callService = require('./service-call');

/**
 * Configure a service call and add its returned data to the local context.
 * You must use some form of request body parser to send POST data.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(services, config){
  if ( config.services ) {
    return config.services.map(function(name){
      var parts = name.split(':');
      var svc = services[parts[1]][parts[0]];
      var dataTransform = svc.transform? utils.lookupFn(svc.transform) : null;
      return function(req, res, next){
        var requestConfig = _.extend({}, svc);
        var session = _.extend({}, req.query, req.params);
        if ( req.body && !_.isEmpty(req.body) ) {
          requestConfig.json = req.body;
        }
        requestConfig.uri = utils.replaceStringTokens(session, svc.uri);
        callService(requestConfig)
          .fail(next)
          .then(function(data){
            if ( dataTransform ) {
              data = dataTransform(data);
            }
            _.extend(res.locals, data);
            next();
          });
      };
    });
  }
  return null;
};
