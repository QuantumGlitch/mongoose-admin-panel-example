const path = require('path');

// Load into process.env, variables stored in .env file
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

const http = require('http');
const express = require('express');

const app = express();

const frontEndDir = path.join(__dirname, '..', 'frontend', 'build');

app.use(process.env.FRONTEND_BASE_PATH, express.static(frontEndDir));
app.get(path.join(process.env.FRONTEND_BASE_PATH, '*'), (req, res) =>
  res.sendFile(path.join(frontEndDir, 'index.html'))
);

const server = http.createServer(app);
server.listen(process.env.FRONTEND_PORT, () =>
  console.log(
    `FrontEnd listening on ${
      new URL(
        process.env.FRONTEND_BASE_PATH,
        `${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_HOST}${
          process.env.FRONTEND_PORT == 80 || process.env.FRONTEND_PORT == 443
            ? ''
            : `:${process.env.FRONTEND_PORT}`
        }`
      ).href
    }`
  )
);
