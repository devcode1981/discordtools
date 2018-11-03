const APIRequest = require('./APIRequest');
const APIMethods = require('./APIMethods');
const UAManager = require('./UAManager');
const SequentialAPIHandler = require('./handlers/Sequential');
const BurstAPIHandler = require('./handlers/Burst');
const Constants = require('../util/Constants');

class APIManager {
  constructor(client) {
    this.client = client;
    this.handlers = {};
    this.globalRateLimited = false;
    this.rateLimitedEndpoints = {};
    this.methods = new APIMethods(this);
    this.userAgent = new UAManager(this);
  }

  destroy() {
    for (const handler of Object.values(this.handlers)) if (handler.destroy) handler.destroy();
  }

  push(handler, ApiRequest) {
    return new Promise((resolve, reject) => {
      handler.push({
        request: ApiRequest,
        resolve,
        reject,
      });
    });
  }

  fetchAPIHandler() {
    switch (this.client.options.apiRequestMethod) {
      case 'sequential':
        return SequentialAPIHandler;
      case 'burst':
        return BurstAPIHandler;
      default:
        throw new Error(Constants.Errors.UNKNOWN_RATE_LIMIT_METHOD);
    }
  }

  request(method, url, auth, data, file, reason) {
    const ApiRequest = new APIRequest(this, method, url, auth, data, file, reason);
    if (!this.handlers[ApiRequest.route]) {
      const APIHandlerType = this.fetchAPIHandler();
      this.handlers[ApiRequest.route] = new APIHandlerType(this, ApiRequest.route);
    }
    return this.push(this.handlers[ApiRequest.route], ApiRequest);
  }
}

module.exports = APIManager;
