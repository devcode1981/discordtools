const fs = require('fs');
const path = require('path');
const Util = require('../util/Util');
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
    this.options = Util.combineDefault(Constants.DatabaseOptions, options);
    var dbname;
    if (options.dbName) dbname = options.dbName;
    else if (options.dbName) dbname = 'dtdb.json';
    if (options.filePath && fs.existsSync(path.resolve(dbname))) fs.writeFileSync(path.resolve(dbname), '{ }');
    if (!fs.existsSync(path.resolve(dbname))) fs.writeFileSync(dbname, '{}');
    this.dbPath = path.resolve(dbname);
    this.db = require(this.filePath);
  }

  /**
   * Add a number to a value.
   * @param {string} key
   * @param {number} data
   */
  add(key, data) {
    let fetched = this._clone(this.db[key] + data);
    this.db[key] = this._clone(fetched);
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
   * Edit a value.
   * @param {string} key
   * @param {string|boolean|object|number} value
   */
  edit(key, value) {
    this.db[key] = this._clone(value);
    this.save();
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
          let keyArray = [];
          key.forEach((element) => {
            return keyArray.push(element)
          });
          keyArray.forEach((keyElement) => {
            if (this.db.hasOwnProperty(keyElement)) console.log(keyElement + ': ' + true);
            else console.log(keyElement + ': ' + false);
          });
        }
      case 'string':
        {
          if (this.db.hasOwnProperty(key)) console.log(true);
          else if (!this.db.hasOwnProperty(key)) console.log(false);
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
   * @param {string} key
   * @param {string} data
   */
  startsWith(key, data) {
    if (data === undefined) return undefined;
    if (this.db[key].startsWith(data)) return console.log(true);
    else console.log(false);
  }

  /**
   * Subtract a number from a value.
   * @param {string} key
   * @param {number} data
   */
  subtract(key, data) {
    let fetched = this._clone(this.db[key] - data);
    this.db[key] = this._clone(fetched);
    this.save();
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