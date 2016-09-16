const mapSchema = require('./map-schema');
const _ = require('lodash');

module.exports = (config, services) => {
  if (!config.schema) throw new TypeError('map middleware is missing schema');

  return (req, res, next) => {
    if (config.dataKey) {
      _.set(res.locals, config.dataKey, mapSchema(config.schema, res.locals));
    } else {
      res.locals = mapSchema(config.schema, res.locals);
    }

    next();
  };
};
