/**
 * Renders a view if one is specified. You must first setup a view rendering
 * engine with express (http://expressjs.com/4x/api.html#app.engine). The name
 * config will be the path to the view after the view directory. (see: test/view-spec.js)
 * @module view
 * @param {object} config
 * @example { "type": "view", "name": "my-view" }
 */
module.exports = function(config){
  return function(req, res, next){
    res.render(config.name, res.locals);
  };
};
