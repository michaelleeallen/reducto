const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const fixture = require('./fixtures/services');

var callServiceStub = sinon.stub().returns(new Promise(res => res(fixture.RESPONSE)));
var service = proxyquire('../lib/service', {
  './service-call': callServiceStub
});

describe('service', function() {

  afterEach(function() {
    callServiceStub.reset();
  });

  it('should set request options from config', function() {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const opts = {
      method: 'get',
      uri: 'http://example.com/api/weather/29681?days='
    };
    svc({params: {zip: '29681'}}, {locals: {}});
    expect(callServiceStub.getCall(0).args[0]).to.deep.equal(opts);
  });

  it('should set request body if provided', function() {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const opts = {
      method: 'get',
      uri: 'http://example.com/api/weather/29681?days=',
      json: {foo: 'bar'}
    };
    svc({params: {zip: '29681'}, body: {foo: 'bar'}}, {locals: {}});
    expect(callServiceStub.getCall(0).args[0]).to.deep.equal(opts);
  });
  
  it('should map session values to service URI tokens', function() {
    const expectedURI = 'http://example.com/api/weather/29681?days=5';
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    svc({params: {zip: '29681', days: '5'}}, {});
    expect(callServiceStub.getCall(0).args[0].uri).to.equal(expectedURI);
  });

  it('should map data from service response to a specified schema if provided', function(done) {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    var svcCall = svc({params: {zip: '29681'}, body: {foo: 'bar'}}, {locals: {}});
    svcCall.then((data) => {
      expect(data.weather).to.exist;
      expect(data.weather.title).to.equal('Yahoo! Weather - Simpsonville, SC');
      done();
    }).catch(done);
  });
});
