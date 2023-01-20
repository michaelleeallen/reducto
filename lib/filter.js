const _ = require('lodash');
const { getAtPath } = require('./utils');

module.exports = (config) => {
  if (!_.has(config, 'dataPath')) throw new TypeError('dataPath is required for filtering');
  if (!_.has(config, 'key')) throw new TypeError('key is required for filtering');
  if (!_.has(config, 'value')) throw new TypeError('value is required for filtering');

  return (req, res, next) => {
    var data = getAtPath(res.locals, config.dataPath);
    var filteredData = data.filter(o => o[config.key] === config.value);
    _.set(res.locals, config.dataPath, filteredData);
    next();
  };
};
