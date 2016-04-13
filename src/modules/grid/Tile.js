/**
 * A Tile is nothing more than a wrapper around a stanard JavaScript object,
 * and represents the state at a discrete location within a {@link IGrid}.
 * @see {@link IGrid}
 */
class Tile {
  /**
   * Creates a new tile with initial properties
   * @example
   * const hotTile = new Tile({
   *   temperature: 110,
   *   biome: "desert"
   * });
   * @param {Object} [initialProperties={}] - Initial properties of the Tile
   */
  constructor(initialProperties = {}) {
    this._state = initialProperties;
  }

  /**
   * Returns the specified property's value
   * @example
   * let temperature = hotTile.get("temperature");
   * @param {string} key - Name of the property
   * @returns {*} Value of property at `key`, or undefined if property not found
   */
  get(key) {
    return this._state[key];
  }

  /**
   * Sets the specified property's value, or creates and sets the property if it
   * does not yet exist.
   * @example
   * hotTile.set("vegetation", ["cactus", "tumbleweed", "wildflowers"]);
   * //Chaining
   * hotTile.set("one", 1).set("two", 2).set("three", 3);
   * @param {string} key - Name of the property to set/create
   * @param {*} value - Value of the property
   * @returns {Tile} The Tile object
   */
  set(key, value) {
    this._state[key] = value;
    return this;
  }

  /**
   * Deletes the specified property, removing it from the Tile completely
   * @example
   * let didDeleteSomething = hotTile.delete("temperature");
   * @param {string} key - Name of the property to delete
   * @returns {boolean} True if an item was actually deleted, false otherwise
   */
  delete(key) {
    if (this._state.hasOwnProperty(key)) {
      delete this._state[key];
      return true;
    }
    return false;
  }
}

export default Tile;
