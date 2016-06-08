var utils = require('../lib/utils');
var expect = require('chai').expect;
var services = {
  weather: { GET: { uri: 'test' } }
};

describe('utils', function(){
/**
 * { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' },
        { type: 'service', name: 'GET:weather'},
        { type: 'transform', path: '../test/fixtures/transforms.js#foo' },
        { type: 'fixture', data: { boop: 'beep' }}
        */
  describe('#loadStack', function(){
    it('should map service calls to a single middleware function', function(){
      var stack = utils.loadStack({
        services: [
          { type: 'service', name: 'GET:weather'},
          { type: 'service', name: 'GET:weather'}
        ]
      }, services);
      expect(stack).to.have.length(1);
    });
    
    it('should map "before" middleware', function() {
      var stack = utils.loadStack({
        before: [
          { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' }
        ],
        services: [
          { name: 'GET:weather'},
          { name: 'GET:weather'}
        ]
      }, services);
      
      expect(stack).to.have.length(2);
    });
    
    it('should map "after" middleware', function() {
      var stack = utils.loadStack({
        after: [
          { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' }
        ],
        services: [
          { type: 'service', name: 'GET:weather'},
          { type: 'service', name: 'GET:weather'}
        ]
      }, services);
      
      expect(stack).to.have.length(2);
    });
  });

  describe('#replaceStringTokens', function(){
    it('can parse a tokenized string', function(){
      var conf = { foo: 'bar', baz: 'boo' };
      var str = 'Hello, {foo}. My name is {baz}.';
      var result = utils.replaceStringTokens(conf, str);
      expect(result).to.equal('Hello, bar. My name is boo.');
    });
  });

  describe('#lookupFn', function(){
    it('can lookup a custom module', function(){
      expect(utils.lookupFn('../test/fixtures/middleware.js#headerTest')).to.be.a('function');
    });
    it('can lookup a node_module', function(){
      expect(utils.lookupFn('body-parser')).to.be.a('function');
    });
    it('will throw an error if no module found', function(){
      expect(utils.lookupFn.bind({},'foo')).to.throw('Module not found at foo.');
    });
  });
});
