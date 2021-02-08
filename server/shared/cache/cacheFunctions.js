const cache = require('global-cache');

const get = key => cache.get(key);

const set = (key, value) => cache.set(key, value);

module.exports = {
  get,
  set,
};