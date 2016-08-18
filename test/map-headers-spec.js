const mapHeaders = require('../lib/map-headers');
const expect = require('chai').expect;

describe('lib/map-headers', function () {
  it('should return undefined if headers are not configured', function () {
    const result = mapHeaders({});
    expect(result).to.be.undefined;
  });

  it('should map headers from request', function () {
    const req = {
      headers: {
        authorization: 'Basic adsf;dlskjd;lkjlkj'
      }
    };

    const config = {
      headers: {
        authorization: 'FROM_REQUEST'
      }
    };

    const result = mapHeaders(config, req);
    expect(result).to.deep.equal({ authorization: req.headers.authorization });
  });

  it('should throw TypeError if required request header is missing.', function () {
    const config = {
      headers: {
        authorization: 'FROM_REQUEST'
      }
    };

    expect(mapHeaders.bind(null, config, {})).to.throw(TypeError);
  });

  it('should map headers from config', function () {
    const config = {
      headers: {
        'X-Foo': 'bar'
      }
    };

    const result = mapHeaders(config, {});
    expect(result).to.deep.equal(config.headers);
  });
});
