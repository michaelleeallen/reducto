'use-strict';
const _ = require('lodash');
const props = require('pathval');

/**
 * Maps values from data into a new object specified by schema.
 * @param {object} schema - an object specifying a path to retrieve values from
 * @param {object} data - source object to fetch values from
 * @returns {object}
 */
function mapSchema(schema, data) {
  return _.mapValues(schema, val =>
    (typeof val === 'object') ?
      (val.type === 'list') ? _.map(props.get(data, val.path), item => mapSchema(val.schema, item))
        : mapSchema(val, data)
    : props.get(data, val));
}

/**
 * @module map-schema
 */
module.exports = mapSchema;