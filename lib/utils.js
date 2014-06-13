var _ = require('underscore');
var path = require('path');
/**
 * Looks up a module by path and returns it. Optionally specify
 * a specific method to call using '#'-notation.
 * @example
 *  _path = 'lib/middleware.js#myFunc'
 * @module utils
 * @param {string} _path - the relative(to cwd) path to search
 * @returns {function}
 */
exports.lookupFn = function(_path){
  var parts = _path.split('#');
  var modulePath = path.resolve(process.cwd(), parts[0]);
  var mod;
  try {
    mod = require(modulePath);
    return parts.length > 1? mod[parts[1]] : mod;
  } catch(e) {
    throw new TypeError('No module found at ' + modulePath);
  }
};

/** 
 * Takes a config object and a list of functions to
 * configure middleware and push onto the stack.
 * @param {object} config - current route config
 * @param {function,?} n number of configuration functions
 * @returns {array} a list of middleware functions
 */
exports.loadStack = function(config){
  var args = _.rest(_.toArray(arguments));
  var stack = [];
  args.forEach(function(fn){
    var out = fn(config);
    if ( out ) {
      if ( _.isArray(out) ){
        stack = stack.concat(out);
      } else {
        stack.push(out);
      }
    }
  });
  return stack;
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
  return str.replace(/(?:{)([0-9a-zA-Z]+?)(?:})/g,
    function(match, p1){
      return obj[p1] || '';
    });  
};