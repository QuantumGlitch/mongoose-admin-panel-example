const path = require('path');
const fs = require('fs');

// Load into process.env, variables stored in .env file
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

// URLHelper will build info through .env file
const URLHelper = require('../backend/node_modules/mongoose-admin-panel-backend/utilities/url');

// Setup the configuration object
const configObject = {
  api: {
    baseUrl: URLHelper.BackEnd.base,
  },
  baseUrl: URLHelper.FrontEnd.base,
};

const configJsonPath = path.join(__dirname, 'src', 'config.json');

// Update the json
fs.writeFileSync(configJsonPath, JSON.stringify(configObject));
console.log('✅ Updated frontend/src/config.json');

// Update the package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

packageJson.homepage = process.env.FRONTEND_BASE_PATH;

// Update the json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
console.log('✅ Updated frontend/package.json');
