'use-strict';
const _ = require('lodash');

/**
 * Maps values from data into a new object specified by schema.
 * @param {object|array} schema - an object specifying a path to retrieve values from
 * @param {object} data - source object to fetch values from
 * @returns {object}
 */
function mapSchema (schema, data) {
  if (Array.isArray(schema)) {
    var arraySchema = _.first(schema);
    if (_.has(arraySchema, 'schema')) {
      return mapList(arraySchema.schema, data, arraySchema.path);      
    } else {
      return _.get(data, _.get(_.first(schema), 'path'));
    }
  } else {
    return _.mapValues(schema, val => (typeof val === 'object') ? (val.type === 'list') ? mapList(val.schema, data, val.path) : mapSchema(val, data) : _.get(data, val));
  }
}

function mapList (schema, data, path) {
  return _.map(_.get(data, path), item => mapSchema(schema, item));
}

/**
 * @module map-schema
 */
module.exports = mapSchema;
