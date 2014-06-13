var _ = require('underscore');
var utils = require('./utils');
var callService = require('./service-call');
var transform = require('./transform');

/**
 * Configure a service call and add its returned data to the local context.
 * You must use some form of request body parser to send POST data.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(services, config){
  if ( config.services ) {
    var transStack = [];
    var svcStack = config.services.map(function(name, i){
      var parts = name.split(':');
      var svc = services[parts[1]][parts[0]];            
      var trans = transform(svc);
      transStack.push(trans || []);
      return function(req, res, next){
        var requestConfig = _.clone(svc);
        var session = _.extend({}, req.query, req.params);
        if ( !_.isEmpty(req.body) ) {
          requestConfig.json = req.body;
        }
        requestConfig.uri = utils.replaceStringTokens(session, svc.uri);
        callService(requestConfig)
          .fail(next)
          .then(function(data){
            _.extend(res.locals, data);                        
            next();            
          });        
      };      
    });
    return _.flatten(_.zip(svcStack, transStack));    
  }
  return null;
};
