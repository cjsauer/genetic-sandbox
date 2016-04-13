/**
 * A key/value store where the key can be a single string, or an array of
 * strings. In either case, keys are stored internally as strings. String
 * order in an array key does not matter. In other words, ["one", "two"] and
 * ["two", "one"] will point to the same value in the map.
 */
class MultiStringHashMap {
  /**
   * Constructs a new, empty MultiStringHashMap
   */
  constructor() {
    this._map = {};
  }

  /**
   * Returns a hash value for the given string or array of strings. Hash value
   * will be the same for an array containing the same strings regardless of
   * order.
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
   * myHash.delete(["no", "longer", "needed"]);
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
