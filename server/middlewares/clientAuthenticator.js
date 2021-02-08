const utils = require('../shared/utils');
const config = require('../config');

// const whiteListedServices = {
//   [utils.constants.token.STOREPEP_MAIN_SERVICE]: true,
// };

const authenticateToken = async (socket, next) => {
  console.log('socket.headers: ', socket.headers);

  let result = { success: false };
  if (socket.handshake && socket.handshake.query) {
    const { token, 'service-id': serviceId } = socket.handshake.query;
    const tokenConfig = config.token[serviceId];
    if (tokenConfig) {
      socket.serviceId = serviceId;
      const { secret, issuer, audience } = tokenConfig;
      result = await utils.token.verify(token, secret, issuer, audience);
    }
  }

  console.log('result: ', result);
  if (result.success) {
    socket.shop = result.tokenData.shop;
    next();
  } else {
    next(new Error('authentication error'));
  }
};

module.exports = authenticateToken;
