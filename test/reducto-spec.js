var utils = require('../lib/utils');
var reducto = require('../index');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

var app = {
  get: sinon.spy(),
  post: sinon.spy()
};

describe('reducto', function(){

  after(function() {
   utils.loadStack.restore();
  });

  it('can configure routes', function(){
    sinon.spy(utils, 'loadStack');

    var routes = {
      "/foo": {
        "GET": [
          {type: 'service', name: 'GET:foo'}
        ]
      }
    };

    reducto(app, routes, {});

    expect(app.get).to.have.been.calledWith('/foo');
    expect(app.get).to.have.been.calledOnce;
    expect(utils.loadStack).to.have.been.calledOnce;
    expect(utils.loadStack).to.have.been.calledWith(routes['/foo'].GET, {});
  });
});
