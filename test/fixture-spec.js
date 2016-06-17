const expect = require('chai').expect;
const fixture = require('../lib/fixture');

describe('fixture', function(){
  it('returns static data', function(done){
    var fn = fixture({data: { foo: 'bar' }});
    var res = { locals: { boop: 'beep' }};
    fn({}, res, function(error){
      if (error) return done(error);
      expect(res.locals.boop).to.equal('beep');
      expect(res.locals.foo).to.equal('bar');
      done();
    });
  });
});
