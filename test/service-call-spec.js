var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var requestStub = sinon.stub();
var callService = proxyquire('../lib/service-call', {
  'request': requestStub
});

describe('service-call', function(){
  afterEach(function() {
    requestStub.reset();
  });
  
  it('makes web service calls', function(done){
    requestStub.callsArgWith(1, null, {}, '{"foo": "bar"}');
    callService({
      uri: 'http://example.com/api/test'
    }).then((data) => {
      expect(data.foo).to.eq('bar');
      done();
    }).catch(done);
  });
  
  it('will bail if request error encountered', function(done) {
    requestStub.callsArgWith(1, {message: 'Oh no!'}, {}, null);
    callService({
      uri: 'http://example.com/api/test'
    }).catch((e) => {
      expect(e.message).to.eq('Oh no!');
      done();
    });
  });
  
  it('will fail if it cannot parse JSON response', function(done) {
    requestStub.callsArgWith(1, null, {}, '<html>');
    callService({
      uri: 'http://example.com/api/test'
    }).catch((e) => {
      expect(e.message).to.eq('Unexpected token <');
      done();
    });
  });
});
