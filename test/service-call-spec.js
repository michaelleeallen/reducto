const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const requestStub = sinon.stub();
const callService = proxyquire('../lib/service-call', {
  'request': requestStub
});

describe('service-call', function(){
  afterEach(function() {
    requestStub.reset();
  });
  
  it('makes web service calls', function(done){
    requestStub.callsArgWith(1, null, {}, {"foo": "bar"});
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
});
