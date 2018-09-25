const fs = require('fs');
const path = require('path');
const Constants = require('../util/Constants');
const Util = require('../util/Util');

class Database {

  /**
   * @param {DatabaseOptions} [options] Database options.
   */
  constructor(options = {}) {
    /**
     * Database options.
     * @type {DatabaseOptions} Database options.
     */
    this.options = Util.combineDefault(Constants.DatabaseOptions, options);

    let dbname = 'db.json';
    if (!fs.existsSync(path.resolve(dbname))) fs.writeFileSync(dbname, '{}');
    this.filePath = path.resolve(dbname);
    this.db = require(this.filePath);
  }

  /**
   * Fetches a key and value.
   * @param {string} key
   * @returns {Promise}
   * @example
   * fetch('Key name')
   *   .then((value) => {
   *     console.log(value);
   *   })
   *   .catch((err) => {
   *     console.log(err);
   *   })l
   */
  fetch(key) {
    if (typeof key !== 'string') throw new Error('Key must be a string.');
    return Promise.resolve(this._clone(this.db[key]));
  }

  /**
   * Fetches all keys & values.
   * @returns {Promise}
   * @example
   * fetchAll()
   *   .then((db) => {
   *     console.log(db);
   *   })
   *   .catch((err) => {
   *     console.log(err);
   *   });
   */
  fetchAll() {
    return Promise.resolve(this._clone(this.db));
  }

  /**
   * Whether or not, the database has a key or not.
   * @param {string|Array} key
   * @param {string} [method]
   * @example
   * // Checks whether the database has a key.
   * has('Key name');
   * @example
   * // Checks whether the database have keys.
   * has(['Key name', 'key Name', 'Key Name', 'key name'], true);
   */
  has(key, method = 'string') {
    if ((typeof key === 'string' && method === 'array') || (typeof key === 'Array' || method === 'string')) throw new Error('Array method is only available using array.')
    switch (method) {
      case 'array':
        {
          let keyArr = [];
          key.forEach(element => {
            return keyArr.push(element)
          });
          keyArr.forEach((keyElement) => {
            if (this.db.hasOwnProperty(keyElement)) {
              return console.log(keyElement + ': ' + true);
            } else {
              return console.log(keyElement + ': ' + false);
            }
          });
        }
      case 'string':
        {
          if (this.db.hasOwnProperty(key)) {
            console.log(true);
          } else if (!this.db.hasOwnProperty(key)) {
            console.log(false);
          }
        }
      default:
        {
          throw new Error('Unknown method was provided.');
        }
    }
  }

  /**
   * Sets a key and value.
   * @param {string} key
   * @param {string|number|boolean|object} value
   * @example
   * set('key', 'value');
   */
  set(key, value) {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'object') throw new Error('Value must be either a string, boolean, number, or object.');
    this.db[key] = this._clone(value);
    this.save();
  }

  /**
   * Adds a number to a value.
   * @param {string} key
   * @param {number} data
   * @example
   * add('key', 7);
   */
  add(key, data) {
    if (typeof key !== 'string' || typeof this.db[key] !== 'number' || typeof data !== 'number') throw new Error('Key and data must be a number.');
    options = {};
    let fetched = this._clone(this.db[key] + data);
    this.db[key] = this._clone(fetched);
    this.save();
  }

  /**
   * Subtracts a number from a value.
   * @param {string} key
   * @param {number} data
   * @example
   * subtract('key', 6);
   */
  subtract(key, data) {
    if (typeof key !== 'string' || typeof this.db[key] !== 'number' || typeof data !== 'number') throw new Error('Key and data must be a number.');
    options = {};
    let fetched = this._clone(this.db[key] - data);
    this.db[key] = this._clone(fetched);
    this.save();
  }

  /**
   * Edits a value of a key.
   * @param {string} key
   * @param {string|boolean|object|number} value
   * @example
   * edit('key', 'value');
   */
  edit(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string' || typeof value !== 'boolean' || typeof value !== 'object' || typeof value !== 'number') throw new Error('Value must be either a string, boolean, number, or object.');
    this.db[key] = this._clone(value);
    this.save();
  }

  /**
   * Deletes a key.
   * @param {string} key
   * @example
   * delete('key');
   */
  delete(key) {
    if (typeof key !== 'string') throw new Error('Key must be a string.');
    delete this.db[key];
    this.save();
  }


  /**
   * Deletes all keys and values.
   * @returns {Promise}
   * @example
   * deleteAll().then((db) => {
   *   console.log(db);
   * })
   */
  deleteAll() {
    for (let key in this.db) {
      this.delete(key);
      this.save();
    }
    return Promise.resolve(this.db);
  }

  /**
   * Checks whether a key starts with a string.
   * @param {string} key
   * @param {string} data
   * @example
   * startsWith('key', 'tools');
   */
  startsWith(key, data) {
    if (typeof key !== 'string' || typeof data !== 'string') throw new Error('Key and data must be a string.');
    if (data === undefined) return undefined;
    if (this.db[key].startsWith(data)) return console.log(true);
    else console.log(false);
  }

  /**
   * @param {string} path
   */
  save(path) {
    if (!path) path = this.filePath;
    fs.writeFileSync(path, JSON.stringify(this.db));
  }

  /**
   * @param {Object} data
   */
  _clone(data) {
    if (data === undefined) return undefined;
    return JSON.parse(JSON.stringify(data));
  }
}

module.exports = Database;
