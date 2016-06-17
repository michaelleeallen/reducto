require("babel-register");

const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = function(name, opts, cb){
  const view = require(name);
  const viewFactory = React.createFactory(view);
  var markup = '';

  try {
    markup = `<!Doctype html/>${ReactDOMServer.renderToString(viewFactory(opts))}`;
  } catch( e ) {
    console.log(e);
    cb(e);
  }
  cb(null, markup);
};
