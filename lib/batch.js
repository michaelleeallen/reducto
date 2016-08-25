const service = require('./service');
const nextStub = () => {};
/**
 * Batches services calls and resolves responses after each have completed.
 * @param {object} config - route config
 * @param {object} services - services config
 * @returns {function}
 */
module.exports = (config, services) => (req, res, next) => {
  var serviceCalls = config.services.map(c => service(c, services)(req, res, nextStub));
  Promise.all(serviceCalls)
    .then(() => next())
    .catch(next);
};
