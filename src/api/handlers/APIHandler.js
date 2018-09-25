/**
 * @private
 */
class APIHandler {

    /**
     * @param {APIManager} APIManager API Manager.
     */
    constructor(APIManager) {

        /**
         * API Manager.
         * @type {APIManager}
         */
        this.apiManager = APIManager;

        /**
         * A list of API requests that have yet to be handled.
         * @type {APIRequest[]}
         */
        this.queue = [];
    }

    /**
     * Whether or not, the client is being rate limited on every endpoint.
     * @type {boolean}
     * @readonly
     */
    get globalLimit() {
        return this.apiManager.globalRateLimited;
    }

    set globalLimit(value) {
        this.apiManager.globalRateLimited = value;
    }

    /**
     * Push a new API request to this handler.
     * @param {APIRequest} apiRequest
     */
    push(apiRequest) {
        this.queue.push(apiRequest);
    }

    destroy() {
        this.queue = [];
    }

    handle() {}
}

module.exports = APIHandler;