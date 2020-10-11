import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Config
import config from './config.json';
import API from 'mongoose-admin-panel-frontend/lib/services/API/API';
if (config.api && config.api.baseUrl) API.BASE_URL = config.api.baseUrl;

// Register new components for ComponentRenderer
require('./core/register-components');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
