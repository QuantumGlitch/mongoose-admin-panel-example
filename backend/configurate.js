const path = require('path');

// BackEnd main configuration script
const configuration = require('mongoose-admin-panel-backend/configuration');

// Extends the use schema
configuration.setUserSchemaExtension({
  name: {
    type: 'String',
    kind: 'String',
    required: true,
    description: 'Name',
  },
  surname: {
    type: 'String',
    kind: 'String',
    required: true,
    description: 'Surname',
  },
});

// Setup where to read my custom forms
configuration.customFormPaths.push(path.join(__dirname, 'core', 'forms'));

// Setup where to read my custom mongoose models
configuration.customModelPaths.push(path.join(__dirname, 'models'));
