var expect = require('chai').expect;
var middleware = require('../lib/middleware');
var middlewareFns = require('./middleware');

describe('middleware module', function(){
	it('converts a list of middleware modules into a list of middleware functions', function(){
		var fns = middleware({middleware: ['test/middleware.js#testOne', 'test/middleware.js#testTwo']});
		expect(fns).to.have.length(2);
		expect(fns[0].toString()).to.equal(middlewareFns.testOne.toString());
		expect(fns[1].toString()).to.equal(middlewareFns.testTwo.toString());
	});
});