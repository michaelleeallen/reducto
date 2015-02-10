var fs = require('fs');
var express = require('express');
var reducto = require('../');
var reactRender = require('./lib/react-view-engine');
var app = express();
var routes = require('./config/routes.json');
var services = require('./config/services.json');

// setup rendering engine
app.engine('jsx', reactRender);
app.set('views', './examples/views');
app.set('view engine', 'jsx');

// sets up our routes
reducto(app, routes, services);

// start the show
app.listen(3000, console.log.bind(null, 'Reducto example started. Goto http://localhost:3000/weather/:zipcode'));
