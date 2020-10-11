/**
 * Helpers
 */
const defaultSchema = require('mongoose-admin-panel-backend/models/helpers/default-schema');
const defaultModel = require('mongoose-admin-panel-backend/models/helpers/default-model');

/**
 * Schema
 */
const modelName = 'Manufacturer';
const schema = defaultSchema(
  {
    _id: {
      type: Number,
      kind: 'Number',
      readOnly: true,
      default: 0,
      description: 'Id',
    },
    name: {
      kind: 'String',
      type: String,
      required: true,
      description: 'Name',
    },
  },
  {
    modelName,
    progressiveId: true,
  }
);

module.exports = defaultModel(modelName, schema, { description: 'Manufacturers' });
