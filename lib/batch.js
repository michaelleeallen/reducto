const service = require('./service');

/**
 * Batches services calls and resolves responses after each have completed.
 * @param {object} config - route config
 * @param {object} services - services config
 * @returns {function}
 */
module.exports = function (config, services) {
  return function batch(req, res, next) {
    var serviceCalls = config.services.map(c => service(c, services)(req, res, next));
    Promise.all(serviceCalls)
      .then((responses) => {
        res.locals = responses.reduce((r, c) => Object.assign(r, c), {});
        next();
      })
      .catch(next);
  };
};
