const path = require('path');

// Load into process.env, variables stored in .env file
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

const http = require('http');

const express = require('express');
const cors = require('cors');

// Init mongoose
const mongoose = require('mongoose');
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // First of all configurate the backend, with essentials information
    require('./configurate');

    // Async: Initialize database (default models and default data)
    require('./boot')()
      .then(() => {
        // Express app
        const app = express();

        // CORS
        app.use(cors());

        // Use express-adapter for configuring basic API
        require('mongoose-admin-panel-backend/express')(process.env.BACKEND_BASE_PATH, app, {
          routes: (router) => {
            // Configure custom routes
            require('./routes')(router);
          },
        });

        app.use(function (_, res) {
          res.status(404).json({ ok: false, error: 'Page not found' });
        });

        const server = http.createServer(app);
        server.listen(process.env.BACKEND_PORT, () =>
          console.log(
            `BackEnd listening on ${
              new URL(
                process.env.BACKEND_BASE_PATH,
                `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOST}${
                  process.env.BACKEND_PORT == 80 || process.env.BACKEND_PORT == 443
                    ? ''
                    : `:${process.env.BACKEND_PORT}`
                }`
              ).href
            }`
          )
        );
      })
      .catch(console.error);
  })
  .catch((e) => console.error(`Can't connect to MongoDB: `, e));
