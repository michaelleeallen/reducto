const mapObject = require('../lib/map-schema');
const expect = require('chai').expect;

describe('map-schema', () => {
  it('should map 1:1 values', () => {
    const map = {
      foo: 'bar.baz'
    };
    const data = {
      bar: {baz: 'bop'}
    };
    const result = mapObject(map, data);
    expect(result).to.deep.equal({foo: data.bar.baz});
  });

  it('should map objects as values', () => {
    const map = {foo: {bar: 'baz'}};
    const data = {baz: 'bop'};
    const result = mapObject(map, data);
    expect(result).to.deep.equal({foo: {bar: 'bop'}});
  });

  it('should map arrays as schemas', function () {
    const schema = [{ path: 'foos' }];
    const data = {
      foos: ['a', 'b', 'c']
    };

    expect(mapObject(schema, data)).to.deep.equal(data.foos);
  });

  it('should map arrays as schemas with optional value schema', () => {
    const schema = [
      { path: 'foos', type: 'list', schema: { foo: 'FOOBAR' } }
    ];

    const data = {
      foos: [{FOOBAR: 'a'}, {FOOBAR: 'b'}]
    };

    const expected = [{foo: 'a'}, {foo: 'b'}];

    expect(mapObject(schema, data)).to.deep.equal(expected);
  });

  it('should map 1:n values', () => {
    const map = {
      foo: {
        type: 'list',
        path: 'bar',
        schema: {
          boo: 'baz',
          beep: 'bop'
        }
      }
    };

    const data = {
      bar: [
        {baz: 'a', bop: 'b'},
        {baz: 'c', bop: 'd'}
      ]
    };

    const result = mapObject(map, data);
    expect(result).to.deep.equal({
      foo: [
        {boo: 'a', beep: 'b'},
        {boo: 'c', beep: 'd'}
      ]
    });
  });
});