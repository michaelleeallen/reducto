'use-strict';
var _ = require('lodash');
var utils = require('./lib/utils');

/**
 * Read in route and service definitions from JSON and configure
 * express routes with the appropriate middleware for each.
 * @module reducto
 * @param {object} app - an Express instance
 * @param {object} routes - a routes config
 * @param {object} services - a services config
 */
module.exports = function reducto(app, routes, services) {
  _.each(routes, (methods, route) => {
    _.each(methods, (config, method) => {
      app[method.toLowerCase()](route, utils.loadStack(config, services));
    });
  });
};
