const fs = require('fs');
const express = require('express');
const reducto = require('../');
const reactRender = require('./lib/react-view-engine');
const app = express();
const routes = require('./config/routes.json');
const services = require('./config/services.json');
const IP = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 3000;

// setup rendering engine
app.engine('jsx', reactRender);
app.set('views', './examples/views');
app.set('view engine', 'jsx');

// sets up our routes
reducto(app, routes, services);

// start the show
app.listen(PORT, IP, console.log.bind(null, `Reducto example started. Goto http://${IP}:${PORT}/local/:zipcode`));
