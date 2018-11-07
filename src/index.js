module.exports = {
  // Util
  APIError: require('./rest/APIError'),
  Constants: require('./util/Constants'),
  Util: require('./util/Util'),
  Version: require('../package.json').version,

  // Structures
  Client: require('./structures/Client'),
  Database: require('./structures/Database')
};