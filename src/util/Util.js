const fs = require('fs');
const path = require('path');
const snekfetch = require('snekfetch');

class Util {
    constructor() {
        throw new Error(`${this.constructor.name} class may not be constructed.`);
    }

    /**
     * Sets default properties to an object that are not already specified.
     * @param {Object} defaultProperty Default properties.
     * @param {Object} input Object to assign defaults.
     * @returns {Object}
     * @private
     */
    static combineDefault(defaultProperty, input) {
        if (!input) return defaultProperty;
        for (const key in defaultProperty) {
            if (!{}.hasOwnProperty.call(input, key)) {
                input[key] = defaultProperty[key];
            } else if (input[key] === Object(input[key])) {
                input[key] = this.conbineDefault(defaultProperty[key], input[key]);
            }
        }
        return input;
    }

    /**
     * Converts an ArrayBuffer or string to a Buffer.
     * @param {ArrayBuffer|string} ab ArrayBuffer to convert.
     * @returns {Buffer}
     * @private
     */
    static convertToBuffer(ab) {
        if (typeof ab === 'string') ab = this.str2ab(ab);
        return Buffer.from(ab);
    }

    /**
     * @typedef {string|Buffer} BufferResolvable
     */
    /**
     * @external Stream
     * @see {@link https://nodejs.org/api/stream.html}
     */
    /**
     * Resolves a BufferResolvable to a Buffer.
     * @param {BufferResolvable|Stream} input Buffer or stream resolvable to resolve.
     * @returns {Promise<Buffer>}
     */
    resolveFile(input) {
        if (input instanceof Buffer) return Promise.resolve(input);
        if (this.client.browser && input instanceof ArrayBuffer) return Promise.resolve(this.convertToBuffer(input));
        if (typeof input === 'string') {
            return new Promise((resolve, reject) => {
                if (/^https?:\/\//.test(input)) {
                    snekfetch.get(input)
                        .end((err, res) => {
                            if (err) return reject(err);
                            if (!(res.body instanceof Buffer)) return reject(new TypeError('Response body isn\'t a Buffer.'));
                            return resolve(res.body);
                        });
                } else {
                    const file = path.resolve(input);
                    fs.stat(file, (err, stats) => {
                        if (err) return reject(err);
                        if (!stats || !stats.isFile()) return reject(new Error(`${file} could not be found.`));
                        fs.readFile(file, (err2, data) => {
                            if (err2) reject(err2);
                            else resolve(data);
                        });
                        return null;
                    });
                }
            });
        } else if (input.pipe && typeof input.pipe === 'function') {
            return new Promise((resolve, reject) => {
                const buffers = [];
                input.once('error', reject);
                input.on('data', data => buffers.push(data));
                input.once('end', () => resolve(Buffer.concat(buffers)));
            });
        }
        return Promise.reject(new TypeError('Input must be a string or Buffer.'));
    }

    /**
     * Resolves a Base64Resolvable, a string, or a BufferResolvable to a Base64 image.
     * @param {BufferResolvable|Base64Resolvable} image Image to resolve.
     * @returns {Promise<?string>}
     * @private
     */
    static resolveImage(image) {
        if (!image) return Promise.resolve(null);
        if (typeof image === 'string' && image.startsWith('data:')) {
            return Promise.resolve(image);
        }
        return this.resolveFile(image).then(this.resolveBase64);
    }

    /**
     * A string. (see {@link Constants.Permissions} for more info)
     * A permission number.
     * @typedef {string|number} PermissionResolvable
     */
    /**
     * Resolves permissions to their numeric form.
     * @param {PermissionResolvable|PermissionResolvable[]} permission - Permission(s) to be resolved.
     * @returns {number}
     * @private
     */
    static resolvePermission(permission) {
        if (permission instanceof Array) return permission.map(perm => this._resolvePermission(perm)).reduce((previous, p) => previous | p, 0);
        if (typeof permission === 'string') permission = Constants.Permissions[permission];
        if (typeof permission !== 'number' || permission < 1) throw new RangeError(Constants.Errors.UNKNOWN_PERMISSION);
        return permission;
    }

    /**
     * @param {ColorResolvable} color
     * @returns {number}
     */
    static resolveColor(color) {
        if (typeof color === 'string') {
            if (color === 'RANDOM') return Math.floor(Math.random() * (0xFFFFFF + 1));
            if (color === 'DEFAULT') return 0;
            color = Constants.Colors[color] || parseInt(color.replace('#', ''), 16);
        } else if (color instanceof Array) {
            color = (color[0] << 16) + (color[1] << 8) + color[2];
        }
        if (color < 0 || color > 0xFFFFFF) {
            throw new RangeError('Color must be within the range of 0-16777215 (0xFFFFFF).')
        } else if (color && isNaN(color)) {
            throw new Error('Unable to convert color to a number.');
        }
        return color;
    }

    /**
     * @typedef {Buffer|string} Base64Resolvable
     * @param {Base64Resolvable} data
     * @returns {?string}
     */
    static resolveBase64(data) {
        if (data instanceof Buffer) return `data:image/jpg;base64,${data.toString('base64')}`;
        return data;
    }

    /**
     * @param {object} data
     */
    static clone(data) {
        if (data === undefined) return undefined;
        return JSON.parse(JSON.stringify(data));
    }
}

module.exports = Util;
