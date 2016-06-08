var _ = require('lodash');
var path = require('path');

exports.TYPES = {
  middleware: require('./middleware'),
  service: require('./service'),
  transform: require('./transform'),
  fixture: require('./fixture'),
  view: require('./view')
};

/**
 * Looks up a module by path and returns it. Optionally specify
 * a specific method to call using '#'-notation.
 * @example
 *  _path = './lib/middleware.js#myFunc'
 * @module utils
 * @param {string} _path - the relative(to cwd) path to search
 * @returns {function}
 */
exports.lookupFn = function(_path){
  var parts = _path.split('#');
  var modulePath;
  var mod;

  try {
    modulePath = require.resolve(parts[0]);
    mod = require(modulePath);
  } catch ( err ) {
  }

  if ( !modulePath ) {
    try {
      modulePath = path.resolve(process.cwd(), parts[0]);
      mod = require(modulePath);
    } catch ( e ) {
      throw new TypeError('Module not found at '+parts[0]+'.');
    }
  }

  return parts.length > 1? mod[parts[1]] : mod;
};

function mapConfig(configs, services) {
  return _.map(configs, conf => exports.TYPES[conf.type](conf, services));
}

function sendJson(req, res, next) {
  res.json(res.locals);
}

/**
 * Takes a config object and a list of functions to
 * configure middleware and push onto the stack.
 * @param {object} config - current route config
 * @param {function,?} n number of configuration functions
 * @returns {array} a list of middleware functions
 */
exports.loadStack = function(config, services) {
  var stack = [];
  
  if (_.has(config, 'before')) {
    stack.push(mapConfig(config.before, services));
  }
  
  stack.push(exports.TYPES.service(config.services, services));
  
  if (_.has(config, 'after')) {
    stack.push(mapConfig(config.after, services));
  }
  
  return stack.concat([sendJson]);
};

/**
 * Will map values from an object to tokens defined in the string.
 * @params {object} obj
 * @params {string} str
 * @returns {string} parsed string
 * @example
 *  obj = {zip: 29681}
 *  str = "http://yahoo.com/weather?q={zip}"
 *  = "http://yahoo.com/weather?q=29681"
 */
exports.replaceStringTokens = function(obj, str){
  return str.replace(/(?:{)([0-9a-zA-Z]+?)(?:})/g, (match, p1) => obj[p1] || '');
};
