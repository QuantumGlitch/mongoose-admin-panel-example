/**
 * Helpers
 */
const defaultSchema = require('mongoose-admin-panel-backend/models/helpers/default-schema');
const defaultModel = require('mongoose-admin-panel-backend/models/helpers/default-model');

/**
 * Schema
 */
const modelName = 'Product';
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
    manufacturer: {
      type: Number,
      ref: 'Manufacturer',
      required: true,
      // Deleting the manufacturer parent will delete this product too
      cascade: true,
      description: 'Manufacturer',
    },
    limited: {
      kind: 'Boolean',
      type: Boolean,
      required: true,
      default: false,
      description: 'Limited',
    },
    price: {
      kind: 'Decimal',
      type: Number,
      fixed: 2,
      required: true,
      default: 0,
      description: 'Price (€)',
    },
    quantity: {
      kind: 'Number',
      type: 'Number',
      required: true,
      min: 1,
      default: 0,
      description: 'Quantity',
    },
    localization: {
      kind: 'Object',
      view: 'Default',
      description: 'Localization',
      type: {
        country: {
          kind: 'String',
          type: String,
          description: 'Country',
        },
        city: {
          kind: 'String',
          type: String,
          description: 'City',
        },
      },
    },
  },
  {
    modelName,
    progressiveId: true,
  }
);

module.exports = defaultModel(modelName, schema, { description: 'Products' });
