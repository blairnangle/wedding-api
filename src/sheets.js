const { GoogleSpreadsheet } = require('google-spreadsheet');

const stringifiedClientSecret = '{\n'
    + '  "type": "service_account",\n'
    + '  "project_id": "wedding-356609",\n'
    + '  "private_key_id": "775ba42a704bf7ee4a9b7202e024be99458f8832",\n'
    + '  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoZkuDHviMsaKk\\n7iPfZoXoBMFmeZCtLLdmoz9LmCmK6HFqWuN9xUdpS9sGOlPrkxWPUoQeFtO/8QC1\\nceGwNxe/G8ZQyYSLWyWuc6OtsjtKfnKoio9CQrY2MVLha7y7xHJGATzbrnYa2nsl\\ny9OMLOwhUAWH5VDuYw0z21R/FE++QtkFtBkN05L5zNHsx4JhoCSMu20KKsQTtYfT\\nXYa6XgH3+JQBg1CHymFsC7fyrOX7uVhABY1an9sf+vwhsXdEeJ+0tyVT1qrETEKD\\nJmlRWZsSCAjj8S1SfdetLtDwDI2pJks4a/pIDeIqOFntwNgdBbYM6Ba4yfxa/uv4\\n3w/sTqNJAgMBAAECggEAF5uLn3yihHrMncmCvulNAWtVP4vwQ86+gUWGdI8G1+Hh\\nMHNAbBvReIn5UQSxSherEJYVTnCNy90557Xo2T7H9fMrWJz/l1e2TyAIBKw1Uqqq\\nYUVXcwcOK0e74j0rzrjp+jVnNjbdeMNDO1e5Nu//RGZG+DemIl1BdxEa5dvPmBDl\\npULfgR7EgjgrnWkd5C2eqyOPOHoHIvFLMJPA4XBtswyecwCMF4G/s03E/u/DUzT7\\nZ5EhFJjjjJsROty1pBdtAvvAWqU+YTcMhsJWGozO9mGhfP7jOOml2s8K5/3hSSHJ\\n7im/D1nmizxvz6nKBQnDbgHQ9v99nQPbIj5L+/5zWQKBgQDfETT0b33lXLgJRL6R\\nKmZf9E6OT4CcCkwyqHmCON/vnQld/JFEKd1FH0CbxmezR3GL39VQqOwV0PWt6xH3\\nZxBHQpyFUWcRNnL7QSWO1ILiIKfMf/JmBEAN8Ed0C+kn3PJgV9urBZwnnDIqocEw\\n3XTKwFoWiDShOuWmzKqzn+URFQKBgQDBQu7iTXAlNL1Z819huNzDKsnJSW6/T5pJ\\nNB2AiWzR7zQayvmDYuBih5K/MvpyHAX3d0lk5UBarGrcOVPZSStnd4e3h5EwaSBE\\n2lpwm5peaFo0/TyIbBnn37yOzve2ky1akjgkUYifM9fRXV54Hwp9jKKJiU2v0VQE\\nZnEuYnDOZQKBgDj0Lr4eXVmbg82yBKoR1lO3j/sb521v36arh2KtXNfUE5kwrHJn\\n8fv9D8T2MnH+0snw24kdqDGlyaSfOVYetXRMWKRddWBas57dMla2gbh0uAMpw90y\\nRpyIdeX2SJCKBER/CjIvW4BtjA2AgVAVqwU9eYL5Qd7Mp+gfp5H3SEhFAoGAa/uE\\nEjoGcSN4sSvEnYt2/i2INcmr8YT+xewyl8ExZlNrH5VNuNWkXik2G1LWkK+LveuO\\nvKtDO+aehpIZgYzajaNB15AN1ajHePEwGz82D43q6TSdf/Q2vVJLvtdxnTe63aJZ\\ncCGGXr3O1pJ+2Esvx1qu7n4jRBuIADVlA+/I6+kCgYBMo0U0Etg64+tU6CpEG/cV\\nx2yH5havxkAYMLz6X3K92w7u4TgcxSeIXb8zeXJOuqxTvsOpTADaZDjhvBq1PMH0\\nUjvat7552CKr4RyjfUMJ982zf9X0X6WrLbNl+eU5IVYUQk8nZpz67DVnMu2lb7+g\\nXnlkT0w0uZPhgD6El/OaYQ==\\n-----END PRIVATE KEY-----\\n",\n'
    + '  "client_email": "google-sheets@wedding-356609.iam.gserviceaccount.com",\n'
    + '  "client_id": "102879559030227829398",\n'
    + '  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n'
    + '  "token_uri": "https://oauth2.googleapis.com/token",\n'
    + '  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n'
    + '  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-sheets%40wedding-356609.iam.gserviceaccount.com"\n'
    + '}\n';
const clientSecret = JSON.parse(stringifiedClientSecret);
const googleSheetID = '1OaSXvT-ijKSIhcRPEDILPlKo6tLFsFZ6y4VJmhgZTKQ';

const sheet = new GoogleSpreadsheet(googleSheetID);

async function writeRowToSheet(rowData) {
  await sheet.useServiceAccountAuth(clientSecret);
  await sheet.loadInfo();
  const tab = sheet.sheetsByTitle.RSVP;
  await tab.addRow(rowData);
}

module.exports = writeRowToSheet;
