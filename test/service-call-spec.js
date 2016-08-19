const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const requestStub = sinon.stub();
const callService = proxyquire('../lib/service-call', {
  'request': requestStub
});
const STUB_URL = 'http://example.com/api/test';

describe('service-call', function () {
  afterEach(function () {
    requestStub.reset();
  });

  it('makes web service calls', function (done) {
    requestStub.callsArgWith(1, null, {}, {'foo': 'bar'});
    callService({
      uri: STUB_URL
    }).then((data) => {
      expect(data.foo).to.eq('bar');
      done();
    }).catch(done);
  });

  it('will reject if request error encountered', function (done) {
    requestStub.callsArgWith(1, {message: 'Oh no!'}, {}, null);
    callService({
      uri: STUB_URL
    }).catch((e) => {
      expect(e.message).to.eq('Oh no!');
      done();
    });
  });

  it('will reject if response contains an error code', function (done) {
    const statusCode = 403;
    requestStub.callsArgWith(1, null, {statusCode}, null);
    callService({uri: STUB_URL}).catch((e) => {
      expect(e.statusCode).to.eq(statusCode);
      done();
    });
  });
});
