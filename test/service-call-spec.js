var expect = require('chai').expect;
var callService = require('../lib/service-call');

describe('service-call module', function(){
  it('makes web service calls', function(done){
    callService({
      url: 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location=29681&format=json'
    }).then(function(data){
      expect(data.query).to.exist;
      expect(data.query.results.channel.title).to.equal('Yahoo! Weather - Simpsonville, SC');
      done();       
    }).fail(done);    
  });
});