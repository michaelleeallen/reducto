const path = require('path');

const TYPES = {
  middleware: require('./middleware'),
  service: require('./service'),
  transform: require('./transform'),
  fixture: require('./fixture'),
  view: require('./view'),
  batch: require('./batch'),
  iterator: require('./iterator'),
  filter: require('./filter'),
  map: require('./map')
};

/**
 * Looks up a module by path and returns it. Optionally specify
 * a specific method to call using 'module#method'-notation.
 * @example
 *  _path = './lib/middleware.js#myFunc'
 * @param {string} _path - the path to module relative to CWD
 * @returns {function}
 * @throws TypeError
 */
exports.lookupFn = function (_path) {
  var parts = _path.split('#');
  var modulePath;
  var mod;

  try {
    modulePath = require.resolve(parts[0]);
    mod = require(modulePath);
  } catch (err) {
  }

  if (!modulePath) {
    try {
      modulePath = path.resolve(process.cwd(), parts[0]);
      mod = require(modulePath);
    } catch (e) {
      throw new TypeError(`Module not found at ${parts[0]}.`);
    }
  }

  return (parts.length > 1) ? mod[parts[1]] : mod;
};

/**
 * Default request termination handler.
 * @param req
 * @param res
 */
function send (req, res) {
  res.send(res.locals);
}

/**
 * Takes a config object and a list of functions to
 * configure middleware and push onto the stack.
 * @param {object} configs - current route config
 * @param {object} services - services config
 * @returns {array} a list of middleware functions
 */
exports.loadStack = function (configs, services) {
  return configs.map(c => TYPES[c.type](c, services)).concat([send]);
};

/**
 * Will map values from an object to tokens defined in the string.
 * @params {object} obj
 * @params {string} str
 * @returns {string} parsed string
 * @example
 *  replaceStringTokens({zip: 29681}, "http://yahoo.com/weather?q={zip}") = "http://yahoo.com/weather?q=29681"
 */
exports.replaceStringTokens = function (obj, str) {
  return str.replace(/(?:{)([0-9a-zA-Z]+?)(?:})/g, (match, p1) => obj[p1] || '');
};
