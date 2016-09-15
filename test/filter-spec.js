const filter = require('../lib/filter');
const assert = require('assert');
const sinon = require('sinon');

describe('src/lib/filter-middleware', function () {
  it('should filter a list of data', function () {
    const config = {
      type: 'filter',
      dataPath: 'models',
      key: 'type',
      value: 'a'
    };

    const res = {
      locals: {
        models: [
          {type: 'a', name: 'One'},
          {type: 'b', name: 'Two'},
          {type: 'c', name: 'Three'},
          {type: 'a', name: 'Four'}
        ]
      }
    };

    const next = sinon.spy();
    const expected = [
      {type: 'a', name: 'One'},
      {type: 'a', name: 'Four'}
    ];

    filter(config)({}, res, next);

    assert.deepEqual(expected, res.locals.models);
    assert.ok(next.calledWith());
  });

  it('should throw an error if "dataPath" is not provided', function () {
    const config = {
      key: 'foo',
      value: 'bar'
    };

    assert.throws(filter.bind(null, config));
  });

  it('should throw an error if "key" is not provided', function () {
    const config = {
      dataPath: 'foo',
      value: 'bar'
    };

    assert.throws(filter.bind(null, config));
  });

  it('should throw an error if "value" is not provided', function () {
    const config = {
      dataPath: 'foo',
      key: 'bar'
    };

    assert.throws(filter.bind(null, config));
  });
});
