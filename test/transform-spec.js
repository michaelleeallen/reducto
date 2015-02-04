var transform = require('../lib/transform');
var expect = require('chai').expect;

describe('transform', function(){
  it('can run data through a loaded function and return result', function(done){
    var fn = transform({ path: '../test/fixtures/transforms.js#foo' });
    var res = { locals: { baz: 'boo' }};
    fn({}, res, function(){
      expect(res.locals.foo).to.equal('bar');
      expect(res.locals.baz).to.equal('boo');
      done();
    });
  });
});
