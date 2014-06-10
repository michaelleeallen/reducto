var fs = require('fs');
var express = require('express');
var reducto = require('../');
var dust = require('dustjs-linkedin');
var app = express();
var routes = require('./config/routes.json');
var services = require('./config/services.json');

// contrived example, dont do this in a real app
var tpl = fs.readFileSync('./examples/views/index.dust', 'utf-8');
tpl = dust.compileFn(tpl);
// sets up our routes
reducto(app, routes, services);
// response handling middleware that just renders a template
app.use(function(req, res, next){
  tpl(res.locals, function(error, out){
    res.set('Content-Type', 'text/html');
    res.write(out);
    res.end();
  });
});
// start the show
app.listen(3000, console.log.bind(null, 'Reducto example started at localhost:3000...'));
