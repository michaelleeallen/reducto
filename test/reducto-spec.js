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

  it('can configure routes', function(){
    sinon.spy(utils.TYPES, 'fixture');
    sinon.spy(utils, 'loadStack');

    var routes = {
      "/foo": {
        "GET": [
          { type: "fixture", data: {
            bar: "baz"
          }}
        ]
      }
    };

    reducto(app, routes, {});

    expect(app.get).to.have.been.calledWith('/foo');
    expect(app.get).to.have.been.calledOnce;
    expect(utils.loadStack).to.have.been.calledOnce;
    expect(utils.loadStack).to.have.been.calledWith(routes['/foo'].GET, {});
    expect(utils.TYPES.fixture).to.have.been.calledOnce;
  });
});
