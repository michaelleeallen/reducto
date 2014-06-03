var expect = require('chai').expect;
var fixture = require('../lib/fixture');

describe('fixture module', function(){

  it('returns static data defined by "fixture" key', function(done){
    var fn = fixture({fixture: { foo: 'bar' }});
    var res = { locals: { boop: 'beep' }};
    fn({}, res, function(error){
      if ( error ) return done(error);
      expect(res.locals.boop).to.equal('beep');
      expect(res.locals.foo).to.equal('bar');
      done();
    });
  });
});