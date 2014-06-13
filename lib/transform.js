var utils = require('./utils');

module.exports = function(config){
  if ( config.transform ) {
    var transFn = utils.lookupFn(config.transform);
    return function(req, res, next){
      res.locals = transFn(res.locals);
      next();
    };
  }
};