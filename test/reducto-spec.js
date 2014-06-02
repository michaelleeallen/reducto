var expect = require('chai').expect;
var express = require('express');
var request = require('supertest');
var reducto = require('../index');

var app = express();

var routes = {
	'/test/middleware': {
		get: {
			middleware: ['test/middleware.js#headerTest']
		}
	},
	'/test/fixture': {
		get: {
			fixture: {
				foo: 'bar'
			}
		}
	},
	'/test/services': {
		get: {
			services: ['get:weather']
		}
	},
	'/test/all': {
		get: {
			middleware: ['test/middleware.js#headerTest'],
			services: ['get:weather'],
			fixture: {
				foo: 'bar'
			}
		}
	}
};

var services = {
	weather: {
		get: {
			uri: 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location=29681&format=json',
			transform: 'test/weather-transform.js',
			method: 'get'			
		}
	}
};

reducto(app, routes, services);
app.use(function(req, res, next){
	res.json(res.locals);
});

describe('reducto module', function(){
	it('can configure static fixtures', function(done){
		request(app).get('/test/fixture').expect(200, {foo:'bar'}).end(done);
	});
	it('can configure service calls', function(done){
		request(app).get('/test/services').expect(200).end(done);
	});
	it('can configure middleware stacks per route', function(done){
		request(app).get('/test/middleware').expect(200).expect('x-foo', 'bar').end(done);
	});
	it('can have all configurations on one route', function(done){
		request(app).get('/test/all')
			.expect(200)
			.expect('x-foo', 'bar')
			.end(function(error, res){
				expect(res.body.foo).to.equal('bar');
				expect(res.body.title).to.equal('Yahoo! Weather - Simpsonville, SC');
				done(error);
			});
	});
});