const cacheFunctions = require('./cacheFunctions');

/* Currently simple strings are used. Need to use Hashes in case other elements will be stored in the cache */

const get = key => cacheFunctions.get(key);

const set = (key, value) => cacheFunctions.set(key, value);

module.exports = {
  get,
  set,
};
