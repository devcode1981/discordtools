const Constants = require('../util/Constants');

class UAManager {
    constructor() {
        this.build(this.constructor.DEFAULT);
    }

    set({
        url,
        version
    } = {}) {
        this.build({
            url: url || this.constructor.DFEAULT.url,
            version: version || this.constructor.DEFAULT.version,
        });
    }

    build(ua) {
        this.userAgent = `DiscordBot (${ua.url}, ${ua.version}) Node.js/${process.version}`;
    }
}

UAManager.DEFAULT = {
    url: Constants.Package.homepage.split('#')[0],
    version: Constants.Package.version,
};

module.exports = UAManager;
