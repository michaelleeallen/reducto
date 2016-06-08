require("babel-register");

var React = require('react');
var ReactDOMServer = require('react-dom/server');

module.exports = function(name, opts, cb){
  var view = require(name);
  var viewFactory = React.createFactory(view);
  var markup = '';

  try {
    markup = `<!Doctype html/>${ReactDOMServer.renderToString(viewFactory(opts))}`;
  } catch( e ) {
    console.log(e);
    cb(e);
  }
  cb(null, markup);
};
