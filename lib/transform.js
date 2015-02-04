var utils = require('./utils');

module.exports = function(config){
  var transFn = utils.lookupFn(config.path);
  return function(req, res, next){
    res.locals = transFn(res.locals);
    next();
  };
};
