/**
 * Renders a view if one is specified. You must first setup a view rendering
 * engine with express (http://expressjs.com/4x/api.html#app.engine). The viewName
 * config will be the path to the view after the view directory. (see: test/veiw-spec.js)
 * @module view
 * @param {object} config
 * @example
 *  ...
 *  "/test/route": {
 *    "get": {
 *      "viewName": "my-view"
 *    }
 *  }
 */
module.exports = function(config){
  if ( config.viewName ) {
    return function(req, res, next){
      res.render(config.viewName, res.locals);
    };
  }
  return null;
};
