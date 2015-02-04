var expect = require('chai').expect;
var express = require('express');
var request = require('supertest');
var reducto = require('../index');
var bodyParser = require('body-parser');

var app = express();

var routes = {
  '/test/middleware': {
    GET: [
      { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' }
    ]
  },
  '/test/fixture': {
    GET:[
      { type: 'fixture', data: {
        foo: 'bar'
      }}
    ]
  },
  '/test/services': {
    GET: [
      { type: 'service', name: 'GET:weather' }
    ]
  },
  '/route/with/transform': {
    GET: [
      { type: 'transform', path: '../test/fixtures/transforms.js#foo' },
      { type: 'transform', path: '../test/fixtures/transforms.js#bar' }
    ]
  },
  '/test/all': {
    GET: [
      { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' },
      { type: 'service', name: 'GET:weather' },
      { type: 'transform', path: '../test/fixtures/weather-transform.js' },
      { type: 'fixture', data: {
        foo: 'bar'
      }}
    ]
  }
};

var services = {
  weather: {
    GET: {
      uri: 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location=29681&format=json'
    }
  }
};

app.use(bodyParser());
reducto(app, routes, services);
app.use(function(req, res, next){
  res.json(res.locals);
});

describe('reducto', function(){
  it('can configure static fixtures', function(done){
    request(app).get('/test/fixture').expect(200, {foo:'bar'}).end(done);
  });
  it('can configure service calls', function(done){
    request(app).get('/test/services').expect(200).end(done);
  });
  it('can configure middleware stacks per route', function(done){
    request(app).get('/test/middleware').expect(200).expect('x-foo', 'bar').end(done);
  });
  it('routes can have a transform function', function(done){
    request(app).get('/route/with/transform').expect(200, {foo: 'bar', bar: 'foo'}).end(done);
  });
  it('can have all configurations on one route', function(done){
    request(app).get('/test/all')
      .expect(200)
      .expect('x-foo', 'bar')
      .end(function(error, res){
        expect(res.body.foo).to.equal('bar');
        expect(res.body.weather.title).to.equal('Yahoo! Weather - Simpsonville, SC');
        done(error);
      });
  });
});
