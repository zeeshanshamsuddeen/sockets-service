const jwt = require('jsonwebtoken');

const verify = (token, jwtSecret, issuer, audience) => new Promise((resolve, reject) => {
  jwt.verify(token, jwtSecret, { issuer, audience }, (err, decoded) => {
    if (err) {
      console.log('err: ', err);
      resolve({ success: false, message: 'Invalid Token' });
    } else {
      resolve({ success: true, tokenData: decoded });
    }
  });
});

module.exports = {
  verify,
};