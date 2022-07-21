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
const fetchJSONSecret = require('./fetchJSONSecret');

if (process.env.ENV === 'local') {
  const portNumber = 8083;
  app.listen(portNumber, async () => {
    const googleSheetsClientSecret = require('../google-sheets-client-secret.json');
    const googleSheetID = require('../google-sheet-id.json').value;
    app.set('googleSheetsClientSecret', googleSheetsClientSecret);
    app.set('googleSheetID', googleSheetID);

    console.log(`app listening on port ${portNumber}`);
  });
} else {
  module.exports.handler = async () => {
    const googleSheetsClientSecret = await fetchJSONSecret('google-sheets-client-secret');
    const googleSheetID = await fetchJSONSecret('google-sheet-id').then((jsonSecret) => jsonSecret.value);
    app.set('googleSheetsClientSecret', googleSheetsClientSecret);
    app.set('googleSheetID', googleSheetID);
    serverless(app, {
      binary: binaryMimeTypes,
    });
  };
}
