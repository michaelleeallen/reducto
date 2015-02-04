var fs = require('fs');
var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var dust = require('dustjs-linkedin');
var reducto = require('../index');
var app = express();

dust.onLoad = function(name, cb){
  fs.readFile(name, 'utf-8', cb);
};

app.engine('dust', dust.render);
app.set('views', './test/views');
app.set('view engine', 'dust');

reducto(app, {
  '/test': {
    GET: [
      { type: 'fixture', data: {
        name: 'World'
      }},
      { type: 'view', name: 'test-view'}
    ]
  },
  '/noview': {
    GET: [
      { type: 'fixture', data: {
        name: 'WORLD'
      }}
    ]
  }
}, {});

app.use(function(req, res, next){
  res.json(res.locals);
});

describe('view', function(){
  it('renders a view if specified', function(done){
    request(app).get('/test').expect(200, '<p>Hello, World</p>').end(done);
  });
  it('does nothing if view is not configured', function(done){
    request(app).get('/noview').expect(200, '{"name":"WORLD"}').end(done);
  });
});
