const fs = require('fs');
const path = require('path');
const Constants = require('../util/Constants');

class Database {

  /**
   * @param {string} [dbName]
   */
  constructor(dbName) {
    let dbname;
    if (dbName) dbname = `${dbName}.json`;
    else dbname = 'dtdb';
    if (!fs.existsSync(path.resolve(dbname))) fs.writeFileSync(dbname, '{}');
    this.dbPath = path.resolve(dbname);
    this.db = require(this.dbPath);
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
   * Deletes a specified key from the database.
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
   * Gets a specified element from the database.
   * @param {string} key
   */
  get(key) {
    if (!this.db[key]) return undefined;
    return this._clone(this.db[key]);
  }

  /**
   * Gets all elements from the database.
   * @returns {Promise}
   */
  getAll() {
    return Promise.resolve(this._clone(this.db));
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   * @param {string|Array} key
   * @param {string} [method='string']
   * @returns {boolean}
   */
  has(key, method = 'string') {
    if (method === 'array') {
      let keyArray = [];
      key.forEach((element) => keyArray.push(element));
      keyArray.forEach((keyElement) => {
        if (this.db.hasOwnProperty(keyElement)) {
          return console.log(keyElement + ': ' + true);
        } else {
          return console.log(keyElement + ': ' + false);
        }
      });
    }
    if (method === 'string') {
      if (this.db.hasOwnProperty(key)) {
        return console.log(true);
      } else if (!this.db.hasOwnProperty(key)) {
        return console.log(false);
      }
    }
  }

  /**
   * Sets an element with specified key and value.
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
    if (!path) path = this.dbPath;
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