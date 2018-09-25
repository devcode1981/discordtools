const APIHandler = require('./APIHandler');
const APIError = require('../APIError');

/**
 * @extends {APIHandler}
 * @private
 */
class SequentialAPIHandler extends APIHandler {

    /**
     * @param {APIManager} apiManager API Manager.
     * @param {string} endpoint Endpoint.
     */
    constructor(apiManager, endpoint) {
        super(apiManager, endpoint);

        /**
         * @type {string}
         */
        this.endpoint = endpoint;

        /**
         * @type {number}
         */
        this.timeDifference = 0;

        /**
         * @type {boolean}
         */
        this.busy = false;
    }

    push(request) {
        super.push(request);
        this.handle();
    }

    /**
     * Performs a request then resolves a promise to indicate its promptness for a new request.
     * @param {APIRequest} item
     * @returns {Promise<?Object|Error>}
     */
    execute(item) {
        this.busy = true;
        return new Promise(resolve => {
            item.request.generate().end((err, res) => {
                if (res && res.headers) {
                    this.requestLimit = Number(res.headers['x-ratelimit-limit']);
                    this.requestResetTime = Number(res.headers['x-ratelimit-reset']) * 1000;
                    this.requestRemaining = Number(res.headers['x-ratelimit-remaining']);
                    this.timeDifference = Date.now() - new Date(res.headers.date).getTime();
                }
                if (err) {
                    if (err.status === 429) {
                        this.queue.unshift(item);
                        this.apiManager.client.setTimeout(() => {
                            this.globalLimit = false;
                            resolve();
                        }, Number(res.headers['retry-after']) + this.apiManager.client.options.restTimeOffset);
                        if (res.headers['x-ratelimit-global']) this.globalLimit = true;
                    } else if (err.status >= 500 && err.status < 600) {
                        this.queue.unshift(item);
                        this.apiManager.client.setTimeout(resolve, 1e3 + this.apiManager.client.options.restTimeOffset);
                    } else {
                        item.reject(err.status >= 400 && err.status < 500 ? new APIError(res.request.path, res.body) : err);
                        resolve(err);
                    }
                } else {
                    this.globalLimit = false;
                    const data = res && res.body ? res.body : {};
                    item.resolve(data);
                    if (this.requestRemaining === 0) {
                        this.apiManager.client.setTimeout(
                            () => resolve(data),
                            this.requestResetTime - Date.now() + this.timeDifference + this.apiManager.client.options.restTimeOffset
                        );
                    } else {
                        resolve(data);
                    }
                }
            });
        });
    }

    handle() {
        super.handle();
        if (this.busy || this.remaining === 0 || this.queue.length === 0 || this.globalLimit) return;
        this.execute(this.queue.shift()).then(() => {
            this.busy = false;
            this.handle();
        });
    }
}

module.exports = SequentialAPIHandler;