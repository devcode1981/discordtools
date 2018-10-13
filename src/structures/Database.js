const fs = require('fs');
const path = require('path');
const Utility = require('../util/Util');
const Constants = require('../util/Constants');

class Database {
  /**
   * @param {DatabaseOptions} [options] Database options.
   */
  constructor(options = {}) {

    /**
     * Database options.
     * @type {DatabaseOptions} Database options.
     */
    this.options = Utility.combineDefault(Constants.DatabaseOptions, options);

    const dbname = 'dtdb.json';
    if (!fs.existsSync(path.resolve(dbname))) fs.writeFileSync(dbname, '{}');
    this.filePath = path.resolve(dbname);
    this.db = require(this.filePath);
  }

  /**
   * Fetch a database key.
   * @param {string} key
   */
  fetch(key) {
    return this._clone(this.db[key]);
  }

  /**
   * @returns {Promise}
   */
  fetchAll() {
    return Promise.resolve(this._clone(this.db));
  }

  /**
   * Whether or not, the database has a key or not.
   * @param {string|Array} key
   * @param {string} [method]
   */
  has(key, method = 'string') {
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
          throw new Error(Constants.Errors.UNKNOWN_METHOD);
        }
    }
  }

  /**
   * Set a database key and value.
   * @param {string} key
   * @param {string|number|boolean|object} value
   */
  set(key, value) {
    this.db[key] = this._clone(value);
    this.save();
  }

  /**
   * Add a number to a value.
   * @param {string} key
   * @param {number} data
   */
  add(key, data) {
    options = {};
    let fetched = this._clone(this.db[key] + data);
    this.db[key] = this._clone(fetched);
    this.save();
  }

  /**
   * Subtract a number from a value.
   * @param {string} key
   * @param {number} data
   */
  subtract(key, data) {
    options = {};
    let fetched = this._clone(this.db[key] - data);
    this.db[key] = this._clone(fetched);
    this.save();
  }

  /**
   * Edit a value.
   * @param {string} key
   * @param {string|boolean|object|number} value
   */
  edit(key, value) {
    this.db[key] = this._clone(value);
    this.save();
  }

  /**
   * Delete a key.
   * @param {string} key
   */
  delete(key) {
    delete this.db[key];
    this.save();
  }


  /**
   * @returns {Promise}
   */
  deleteAll() {
    for (let key in this.db) {
      this.delete(key);
      this.save();
    }
    return Promise.resolve(this.db);
  }

  /**
   * @param {string} key
   * @param {string} data
   */
  startsWith(key, data) {
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
   * @param {object} data
   */
  _clone(data) {
    if (data === undefined) return undefined;
    return JSON.parse(JSON.stringify(data));
  }
}

module.exports = Database;