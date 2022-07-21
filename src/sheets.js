const { GoogleSpreadsheet } = require('google-spreadsheet');

async function writeRowToSheet(rowData, clientSecret, sheetID) {
  const sheet = new GoogleSpreadsheet(sheetID);
  await sheet.useServiceAccountAuth(clientSecret);
  await sheet.loadInfo();
  const tab = sheet.sheetsByTitle.RSVP;
  await tab.addRow(rowData);
}

module.exports = writeRowToSheet;
