require('es6-promise').polyfill();

var expect = require('chai').expect;
var service = require('../lib/service');

var services = {
  weather: {
    GET: {
      uri: 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location=29681&format=json'
    }
  }
};
var svcs = service({ name: 'GET:weather' }, services);
var req = {};
var res = { locals: {} };
var results;

describe('service', function(){

  it('maps service name to a middleware function', function(){
    expect(svcs).to.be.a('function');
  });

  it('calls a web service and extends res.locals with the returned data', function(done){
    svcs(req, res, function(error){
      if ( error ) return done(error);
      results = res.locals.query.results.channel;
      expect(results.title).to.equal('Yahoo! Weather - Simpsonville, SC');
      done();
    });
  });
});
