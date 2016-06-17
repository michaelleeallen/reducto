const utils = require('../lib/utils');
const expect = require('chai').expect;
const services = {
  weather: { GET: { uri: 'test' } }
};

describe('utils', function(){
  describe('#loadStack', function(){
    it('should map service calls to a single middleware function', function(){
      const stack = utils.loadStack([
        { type: 'async', services: [
          { type: 'service', name: 'GET:weather'},
          { type: 'service', name: 'GET:weather'}
        ]}
      ], services);

      expect(stack).to.have.length(2); // expect length to be 2 because we add a response middleware to every route
    });
    
    it('should map "before" middleware', function() {
      const stack = utils.loadStack([
        { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' },
        { type: 'async', services: [
          { type: 'service', name: 'GET:weather'},
          { type: 'service', name: 'GET:weather'}
        ]}
      ], services);
      
      expect(stack).to.have.length(3);
    });
    
    it('should map "after" middleware', function() {
      const stack = utils.loadStack([
        { type: 'async', services: [
          { type: 'service', name: 'GET:weather'},
          { type: 'service', name: 'GET:weather'}
        ]},
        { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' }
      ], services);
      
      expect(stack).to.have.length(3);
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
