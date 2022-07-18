const serverless = require('serverless-http');

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
  'image/x-icon',
  'image/svg+xml',
  'application/x-font-ttf',
  'font/ttf',
  'font/otf',
];
const app = require('./app');

if (process.env.ENV === 'local') {
  const portNumber = 8083;
  app.listen(portNumber, () => {
    console.log(`app listening on port ${portNumber}`);
  });
} else {
  module.exports.handler = serverless(app, {
    binary: binaryMimeTypes,
  });
}
