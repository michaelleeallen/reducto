var utils = require('./utils');

module.exports = function(config){
  if ( config.transform ) {    
    return config.transform.map(function(fn){
      var transFn = utils.lookupFn(fn);
      return function(req, res, next){
        res.locals = transFn(res.locals);
        next();
      };
    });
  }
};