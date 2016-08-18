const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const fixture = require('./fixtures/services');

var callServiceStub = sinon.stub().returns(new Promise(resolve => resolve(fixture.RESPONSE)));
const service = proxyquire('../lib/service', {
  './service-call': callServiceStub
});

describe('service', function () {
  afterEach(function () {
    callServiceStub.reset();
  });

  it('should set request options from config', function () {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const opts = {
      method: 'get',
      uri: 'http://example.com/api/weather/29681?days=&format='
    };
    svc({params: {zip: '29681'}}, {locals: {}});
    expect(callServiceStub.getCall(0).args[0]).to.deep.equal(opts);
  });

  it('should set service call headers from request', function () {
    const config = {
      name: 'GET:news'
    };

    const services = {
      news: {
        GET: {
          headers: {
            accepts: 'application/json',
            authorization: 'FROM_REQUEST'
          },
          uri: 'http://example.com/api/news'
        }
      }
    };

    const svc = service(config, services);
    const req = {
      params: { zip: '29681' },
      headers: {
        authorization: 'Basic asd;flskdfjsd;lkfjsd;lkfj='
      }
    };
    const expected = {
      accepts: 'application/json',
      authorization: req.headers.authorization
    };
    svc(req, {});
    expect(callServiceStub.getCall(0).args[0].headers).to.deep.equal(expected);
  });

  it('should allow services config headers to override request headers', function () {
    var svcConfig = Object.assign({}, fixture.SERVICES);
    svcConfig.weather.GET.headers = { accepts: 'application/json' };
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const req = {
      params: { zip: '29681' },
      headers: {
        accepts: 'application/xml',
        authorization: 'Basic asd;flskdfjsd;lkfjsd;lkfj='
      }
    };
    svc(req, {});
    expect(callServiceStub.getCall(0).args[0].headers.accepts).to.equal('application/json');
  });

  it('should set request body if provided', function () {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const req = {
      params: { zip: '29681' },
      body: { foo: 'bar' }
    };

    svc(req, {});
    expect(callServiceStub.getCall(0).args[0].json).to.deep.equal(req.body);
  });

  it('should map session values to service URI tokens', function () {
    const expectedURI = 'http://example.com/api/weather/29681?days=5&format=json';
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    const params = { zip: '29681' };
    const query = { format: 'json' };
    const body = { days: '5' };
    svc({query, params, body}, {});
    expect(callServiceStub.getCall(0).args[0].uri).to.equal(expectedURI);
  });

  it('should map data from service response to a specified schema if provided', function (done) {
    const svc = service(fixture.CONFIG, fixture.SERVICES);
    var svcCall = svc({params: {zip: '29681'}, body: {foo: 'bar'}}, {locals: {}});
    svcCall.then((data) => {
      expect(data.weather).to.deep.equal(fixture.RESPONSE.query.results.channel);
      done();
    }).catch(done);
  });
});
