var path = require('path');

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