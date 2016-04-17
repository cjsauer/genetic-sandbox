/**
 * A key/value store where keys can be a single string, or an array of strings.
 */
class MultiStringHashMap {
  /**
   * Constructs a new, empty MultiStringHashMap
   */
  constructor() {
    /**
     * Internal representation of the key/value store.
     * @type {object}
     * @private
     */
    this._map = {};
  }

  /**
   * Returns a hash value for the given string or array of strings. Hash value
   * will be the same for an array containing the same strings regardless of
   * order. In other words, `["one", "two"]` will hash to the same value as
   * `["two", "one"]`.
   * @private
   * @param {string | Array.string} potentialKey - string or array of strings
   * to hash
   * @returns {string} Hashed value
   */
  _hash(potentialKey) {
    if (typeof potentialKey === "string") {
      return "$" + potentialKey;
    } else if (potentialKey.constructor === Array) {
      return "$" + potentialKey.sort().join(",");
    } else {
      throw new TypeError("MultiStringHashMap#_hash bad argument");
    }
  }

  /**
   * Returns the value stored at the given key
   * @example
   * const shinyMetallicWeapons = myHash.get(["shiny", "metallic", "sharp"]);
   * @param {string | Array.string} key - key to lookup
   * @returns {*} Value at the given key
   */
  get(key) {
    return this._map[this._hash(key)];
  }

  /**
   * Returns true if the given key exists in the map, false otherwise
   * @example
   * myHash.set(["tiny", "spherical"], ["marbles", "peas"]);
   * myHash.hasKey(["tiny", "spherical"]); // true
   * @param {(string | Array.string)} key - key for which to check
   * existence
   * @returns {boolean} True if key exists, false otherwise
   */
  hasKey(key) {
    return this._map.hasOwnProperty(this._hash(key));
  }

  /**
   * Returns an array of all keys in the hash map
   * @example
   * const myHash = new MultiStringHashMap();
   * myHash.set(["one", "two", "three"], [1, 2, 3]);
   * myHash.set("four", 4);
   * let keys = myHash.keys(); // [ ["one", "two", "three"], "four" ]
   * @returns {Array} the array of keys
   */
  keys() {
    return Object.keys(this._map).map((key) => {
      if (key.indexOf(",") < 0) {
        return key.slice(1);
      } else {
        return key.slice(1).split(",");
      }
    });
  }

  /**
   * Sets a value at the given key, or creates and sets the value at the given
   * key if it does not exist
   * @example
   * const myHash = new MultiStringHashMap();
   * myHash.set(["shiny", "metallic", "sharp"], ["sword", "knife", "dagger"]);
   * @param {string | Array.string} key - key to store the value at
   * @param {*} value - the value to store
   * @returns The MultiStringHashMap
   */
  set(key, value) {
    this._map[this._hash(key)] = value;
    return this;
  }

  /**
   * Deletes the given key
   * @example
   * let wasDeleted = myHash.delete(["no", "longer", "needed"]);
   * // myHash.get(["no", "longer", "needed"]) === undefined
   * @param {string | Array.string} key - key to delete
   * @returns {boolean} True if a key was actually deleted, false otherwise
   */
  delete(key) {
    const hash = this._hash(key);
    if (this._map.hasOwnProperty(hash)) {
      delete this._map[hash];
      return true;
    }
    return false;
  }
}

export default MultiStringHashMap;
