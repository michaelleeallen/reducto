var fs = require('fs');
var express = require('express');
var reducto = require('../');
var dust = require('dustjs-linkedin');
var app = express();
var routes = require('./config/routes.json');
var services = require('./config/services.json');

// setup view engine for rendering templates
dust.onLoad = function(name, cb){
  fs.readFile(name, 'utf-8', cb);
};
app.engine('dust', dust.render);
app.set('views', './examples/views');
app.set('view engine', 'dust');

// sets up our routes
reducto(app, routes, services);

// start the show
app.listen(3000, console.log.bind(null, 'Reducto example started. Goto http://localhost:3000/weather/:zipcode'));
