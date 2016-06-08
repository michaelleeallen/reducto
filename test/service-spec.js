var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var fixture = require('./fixtures/services');

var callServiceStub = sinon.stub().returns(new Promise(res => res(fixture.RESPONSE)));
var service = proxyquire('../lib/service', {
  './service-call': callServiceStub
});

const svcs = service(fixture.CONFIG.services, fixture.SERVICES);

describe('service', function() {
  
  before(function(done) {
    var req = {query: {days: '5'}, params: {zip: '29681'}};
    this.response = {locals: {}};
    svcs(req, this.response, done);
  });
  
  it('should map session values to service URI tokens', function() {
    var expectedURI = 'http://example.com/api/weather/29681?days=5';
    var call1 = callServiceStub.getCall(0);
    var requestConfig1 = call1.args[0];
    var call2 = callServiceStub.getCall(1);
    var requestConfig2 = call2.args[0];
    expect(requestConfig1.uri).to.eq('http://example.com/api/weather/29681?days=5');
    expect(requestConfig2.uri).to.eq('http://example.com/api/news/29681');
    callServiceStub.reset();
  });

  it('should map data from service response to a specified key', function() {
    callServiceStub.reset();
    expect(this.response.locals.weather).to.exist;
    expect(this.response.locals.weather.title).to.equal('Yahoo! Weather - Simpsonville, SC');
  });
  
  it('should call multiple services if configured', function() {
    callServiceStub.reset();
    expect(this.response.locals.news).to.exist;
    expect(this.response.locals.weather).to.exist;
  });
});
