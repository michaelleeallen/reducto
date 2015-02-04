var _ = require('lodash');
/**
 * Return any static data configured for the route.
 * @param {object} config
 * @returns {function?}
 */
module.exports = function(config){
  return function(req, res, next){
    _.extend(res.locals, config.data);
    next();
  };
};
