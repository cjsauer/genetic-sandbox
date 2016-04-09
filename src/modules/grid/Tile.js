/**
 * A Tile is nothing more than a [map]{@link https://goo.gl/sOhi4X} of key/value
 * pairs representing the state at a discrete location within a {@link Grid}.
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
    this._state = new Map(Object.entries(initialProperties));
  }

  /**
   * Returns the specified property's value
   * @param {key} key - Name of the property
   * @returns {*} Value of property at `key`
   */
  get(key) {
    return this._state.get(key);
  }

  /**
   * Sets the specified property's value, or creates and sets the property if it
   * does not yet exist.
   * @param {key} key - Name of the property to set/create
   * @param {*} value - Value of the property
   */
  set(key, value) {
    this._state.set(key, value);
  }

  /**
   * Deletes the specified property, removing it from the Tile completely
   * @param {key} key - Name of the property to delete
   */
  delete(key) {
    this._state.delete(key);
  }
}

export default Tile;
