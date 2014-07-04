var _ = require('underscore');
var utils = require('./lib/utils');
var middleware = require('./lib/middleware');
var fixture = require('./lib/fixture');
var service = require('./lib/service');
var transform = require('./lib/transform');
var view = require('./lib/view');
/**
 * Reads in route and service definitions from JSON and configures
 * express routes with the appropriate middleware for each.
 * @module router
 */
module.exports = function(app, routes, services){
  _.each(routes, function(methods, route){
    _.each(methods, function(config, method){
      app[method](route, utils.loadStack(
        config,
        middleware,
        fixture,
        service.bind(null, services),
        transform,
        view
      ));
    });
  });
};
