'use-strict';
const utils = require('./lib/utils');

/**
 * Read in route and service definitions from JSON and configure
 * express routes with the appropriate middleware for each.
 * @module reducto
 * @param {object} app - an Express instance
 * @param {object} routes - a routes config
 * @param {object} services - a services config
 */
module.exports = function reducto(app, routes, services) {
  for (let route of routes) {
    for (let method of route) {
      app[method.toLowerCase()](route, utils.loadStack(config, services));
    }
  }
};
