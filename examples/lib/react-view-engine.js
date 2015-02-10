require('node-jsx').install({harmony: true, extension: '.jsx'});

var React = require('react');

module.exports = function(name, opts, cb){
  var view = require(name);
  var viewFactory = React.createFactory(view);
  var markup = ['<!Doctype html/>'];

  try {
    markup.push(React.renderToString(viewFactory(opts)));
  } catch( e ) {
    console.log(e);
    cb(e);
  }
  cb(null, markup.join(''));
};
