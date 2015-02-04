var expect = require('chai').expect;
var middleware = require('../lib/middleware');
var middlewareFns = require('./fixtures/middleware');

describe('middleware', function(){
  it('returns a middleware function at a given "path"', function(){
    var fn = middleware({path: '../test/fixtures/middleware.js#testOne'});
    expect(fn).to.exist();
    expect(fn.toString()).to.equal(middlewareFns.testOne.toString());
  });

  it('can also use connect/express 3rd-party middleware', function(){
    var fn = middleware({path: 'body-parser'});
    expect(fn).to.exist();
  });
});
