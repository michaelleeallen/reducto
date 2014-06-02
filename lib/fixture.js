var _ = require('underscore');
/**
 * Return any static data configured for the route.
 * @param {object} config
 * @returns {function?}
 */
module.exports = function(config){
  if ( config.fixture ) {
    return function(req, res, next){
      _.extend(res.locals, config.fixture);
      next();
    };
  }
  return null;
};