var _ = require('underscore');
var middleware = require('./lib/middleware');
var fixture = require('./lib/fixture');
var service = require('./lib/service');

/** 
 * Takes a config object and a list of functions to
 * configure middleware and push onto the stack.
 * @param {object} config - current route config
 * @param {function,?} n number of configuration functions
 * @returns {array} a list of middleware functions
 */
var loadStack = function(config){
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
 * Reads in route and service definitions from JSON and configures
 * express routes with the appropriate middleware for each.
 * @module router
 */
module.exports = function(app, routes, services){
  _.each(routes, function(methods, route){
    _.each(methods, function(config, method){
      app[method](route, loadStack(
        config, 
        middleware,
        fixture, 
        service.bind(null, services)
      ));
    });
  });
};