var expect = require('chai').expect;
var service = require('../lib/service');

var services = {
  weather: {
    get: {
      uri: 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location=29681&format=json',
      transform: ['test/weather-transform.js'],
      method: 'get'
    }
  }
};
var svcs = service(services,{ services: ['get:weather'] });
var req = {};
var res = { locals: {} };
var results;

describe('service config module', function(){

  it('maps service names to a list of middleware functions', function(){
    expect(svcs).to.have.length(2);
    expect(svcs[0]).to.be.function;
    expect(svcs[1]).to.be.function;
  });

  it('calls a web service and extends res.locals with the returned data', function(done){
    svcs[0](req, res, function(error){
      if ( error ) return done(error);
      svcs[1](req, res, function(err){
        results = res.locals;
        expect(res.locals.weather.title).to.equal('Yahoo! Weather - Simpsonville, SC');
        done();
      });
    });
  });

  it('transforms the returned data if configured with a transform function', function(){
    expect(results.weather).to.exist;
    expect(results.query).to.be.undefined;
  });

  it('can return a fixture if configured', function(done){
    services.weather.get.fixture = { query: { results: { channel: { foo: 'bar' } } } };
    res.locals = {};
    var svc = service(services, { services: ['get:weather'] });
    svc[0](req, res, function(error){
      if ( error ) return done(error);
      svc[1](req, res, function(err){
        if ( err ) return done(err);
        expect(res.locals.weather.foo).to.equal('bar');
        done();
      });
    });
  });
});
