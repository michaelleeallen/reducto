var view = require('../lib/view');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

var res = {
  render: sinon.spy(),
  locals: {}
};

describe('view', function(){
  it('renders a view if specified', function(){
    var viewFn = view({ name: 'my-view' });
    viewFn({}, res);
    expect(res.render).to.have.been.calledWith('my-view', res.locals);
  });
});
