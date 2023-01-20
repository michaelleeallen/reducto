const { getAtPath, setAtPath } = require('./utils');

module.exports = (config) => {
  if (!Object.hasOwnProperty(config, 'dataPath')) throw new TypeError('dataPath is required for filtering');
  if (!Object.hasOwnProperty(config, 'key')) throw new TypeError('key is required for filtering');
  if (!Object.hasOwnProperty(config, 'value')) throw new TypeError('value is required for filtering');

  return (req, res, next) => {
    var data = getAtPath(res.locals, config.dataPath);
    var filteredData = data.filter(o => o[config.key] === config.value);
    setAtPath(res.locals, config.dataPath, filteredData);
    next();
  };
};
