/**
 * Return any static data.
 * @param {object} config
 * @returns {function}
 */
module.exports = function(config){
  return function fixture(req, res, next){
    Object.assign(res.locals, config.data);
    next();
  };
};
