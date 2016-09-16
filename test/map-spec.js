const sinon = require('sinon');
const map = require('../lib/map');
const assert = require('assert');

describe('lib/map', function () {
  it('should map a provided schema to res.locals', function () {
    const config = {
      type: 'map',
      schema: {
        foo: 'bar.baz'
      }
    };

    const next = sinon.spy();

    var res = {
      locals: {
        bar: {
          baz: 'abcdefg'
        }
      }
    };

    map(config)({}, res, next);

    assert.deepEqual({foo: 'abcdefg'}, res.locals);
    assert.ok(next.calledWith());
  });

  it('should map a provided schema to a provided dataKey in res.locals', function () {
    const config = {
      type: 'map',
      dataKey: 'foo',
      schema: {
        name: 'bar'
      }
    };

    const next = sinon.spy();
    var res = {
      locals: {
        bar: 'baz'
      }
    };

    map(config)(null, res, next);

    assert.deepEqual({foo: {name: 'baz'}, bar: 'baz'}, res.locals);
    assert.ok(next.calledWith());
  });

  it('should throw an error if no schema is provided', function () {
    assert.throws(map.bind(null));
  });
});
