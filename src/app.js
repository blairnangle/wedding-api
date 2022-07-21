const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const getBasePath = require('./middleware/getBasePath');
const writeRowToSheet = require('./sheets');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/', getBasePath, jsonParser, async (req, res) => {
  await writeRowToSheet(req.body, app.get('googleSheetsClientSecret'), app.get('googleSheetID')).then((r) => {
    res.status(200);
    res.send(r);
  });
});

module.exports = app;
