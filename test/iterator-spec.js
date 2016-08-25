const proxyquire = require('proxyquire');
const sinon = require('sinon');
const expect = require('chai').expect;
const batchStub = sinon.stub().returns(sinon.stub());
const iterator = proxyquire('../lib/iterator', {
  './batch': batchStub
});

const SERVICES = {
  foo: {
    GET: {
      uri: 'http://example.com/api/foo/{id}'
    }
  }
};

describe('lib/iterator', function () {
  it('should provide custom context from previous service response data', function () {
    const config = { type: 'iterator', key: 'foo', service: { name: 'GET:foo' } };
    const res = { locals: { foo: [{id: '1'}, {id: '2'}, {id: '3'}] } };
    const next = sinon.stub();
    const expected = { services: [
      { type: 'service', name: config.service.name, context: {id: '1'}},
      { type: 'service', name: config.service.name, context: {id: '2'}},
      { type: 'service', name: config.service.name, context: {id: '3'}}
    ]};

    iterator(config, SERVICES)({}, res, next);
    expect(batchStub.calledWith(expected, SERVICES)).to.be.true;
  });
});
