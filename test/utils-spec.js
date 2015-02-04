var utils = require('../lib/utils');
var expect = require('chai').expect;
var services = {
  weather: { GET: { uri: 'test' } }
};

describe('utils', function(){

  describe('#loadStack', function(){
    it('will return a list of middleware functions', function(){
      var stack = utils.loadStack([
        { type: 'middleware', path: '../test/fixtures/middleware.js#headerTest' },
        { type: 'service', name: 'GET:weather'},
        { type: 'transform', path: '../test/fixtures/transforms.js#foo' },
        { type: 'fixture', data: { boop: 'beep' }}
      ], services);
      expect(stack).to.have.length(4);
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
      expect(utils.lookupFn.bind({},'foo')).to.throw('No module found at foo.');
    });
  });
});
