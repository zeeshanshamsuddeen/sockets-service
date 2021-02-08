const cache = require('../shared/cache');
const config = require('../config');

const buildCacheKey = (serviceId, shop) =>  `${serviceId}:${shop}`;

const buildCacheKey2 = (serviceId, shop, sessionId) =>  `${serviceId}:${shop}:${sessionId}`;

const acceptClientConnection = (socket) => {
  console.log('new socket connection: ', socket.id);
  // socket.tokenData.socketId = socket.id;
  const { serviceId, shop, id: socketId } = socket;
  const cacheValue = { socketId };
  const cacheKey = buildCacheKey(serviceId, shop);
  let availableConnection = cache.sockets.get(cacheKey);
  if (availableConnection && Array.isArray(availableConnection)) {
    availableConnection.push(cacheValue);
  } else {
    availableConnection = [cacheValue];
  }
  cache.sockets.set(cacheKey, availableConnection);

  socket.on('disconnect', () => {
    let availableConnection = cache.sockets.get(cacheKey);
    const currentConnectionIndex = availableConnection && Array.isArray(availableConnection) ? availableConnection.findIndex(c => c.socketId === socket.id) : -1;
    if (currentConnectionIndex !== -1) {
      console.log('initial Connections: ', availableConnection.length);
      availableConnection.splice(currentConnectionIndex, 1);
      console.log('final Connections: ', availableConnection.length);
      cache.sockets.set(cacheKey, availableConnection);
    }
  });
};

const updateConnectedUsers = (contextObject, updateToSend) => {
  console.log('updateToSend: ', updateToSend);
  const { shop, serviceId, sessionId } = contextObject;
  const cacheKey = buildCacheKey2(serviceId, shop, sessionId);
  console.log('cacheKey: ', cacheKey);
  const socketChannel = config.socketChannels[serviceId];
  const availableConnections = cache.sockets.get(cacheKey);
  console.log('availableConnections: ', availableConnections);
  if (availableConnections && availableConnections.length) {
    for (let index = 0; index < availableConnections.length; index++) {
      const availableConnection = availableConnections[index];
      const socket = global.socketIO.sockets.connected[availableConnection.socketId];
      if (socket) {
        console.log('socket: ', socket.id);
        socket.emit(socketChannel, updateToSend);
      }
    }
  } else {
    console.log('socket: Broadcast');
    global.socketIO.emit(socketChannel, updateToSend);
  }
}

module.exports = { acceptClientConnection, updateConnectedUsers };