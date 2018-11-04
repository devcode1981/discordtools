module.exports = {
  // Utilities
  Util: require('./util/Util'),
  Constants: require('./util/Constants'),
  APIError: require('./rest/APIError'),
  Version: require('../package.json').version,

  // Structures
  Client: require('./structures/Client'),
  Database: require('./structures/Database')
};