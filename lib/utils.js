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
