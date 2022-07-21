const AWS = require('aws-sdk');

module.exports = (secretName) => {
  const region = 'eu-west-2';
  const client = new AWS.SecretsManager({ region });

  return client.getSecretValue({ SecretId: secretName });

  // return new Promise((resolve, reject) => {
  //   client.getSecretValue({ SecretId: secretName }, (err, data) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       JSON.parse(data.SecretString);
  //     }
  //   });
  // });
};
