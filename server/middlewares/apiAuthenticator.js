// const { getVerifiedToken } = require('./helper');
const config = require('../config');
const utils = require('../shared/utils');

const getParsedToken = (token) => {
  return token.split(' ')[1];
}

const getVerifiedToken = async (token, serviceId) => {
  console.log('serviceId: ', serviceId);
  let parsedToken = getParsedToken(token);
  let returnObject = { success: false, message: 'No Token Found' };;
  const tokenConfig = config.token[serviceId];
  console.log('parsedToken: ', parsedToken);
  console.log('tokenConfig: ', tokenConfig);
  if (parsedToken && tokenConfig) {
    const { secret, issuer, audience } = tokenConfig;
    returnObject = await utils.token.verify(parsedToken, secret, issuer, audience);
  }
  return returnObject;
};

const authenticate = async (req, res, next) => {
  try {
    const verifiedToken = await getVerifiedToken(req.headers.authorization, req.headers['service-id']);
    console.log('verifiedToken: ', verifiedToken);
    if (verifiedToken.success) {
      req.headers.serviceId = req.headers['service-id'];
      req.headers.shop = verifiedToken.tokenData.shop;
      req.headers.sessionId = verifiedToken.tokenData.sessionId;
      next();
    } else {
      res.status(401).json({ success: false, message: "Authentication Failed." });
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(401).json({ success: false, message: "Authentication Failed." });
  }
};

module.exports = authenticate;