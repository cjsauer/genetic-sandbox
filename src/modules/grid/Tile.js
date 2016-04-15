import EventEmitter from "wolfy87-eventemitter";

/**
 * A Tile is nothing more than a wrapper around a stanard JavaScript object,
 * and represents the state at a discrete location within a {@link IGrid}.
 * @see {@link IGrid}
 */
class Tile extends EventEmitter {
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
    super();
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
   * Returns true if this Tile has the given key, false otherwise
   * @param {string} key - the key to check
   * @returns {boolean} True if the Tile has the given property, false
   * otherwise
   */
  hasProperty(key) {
    return this._state.hasOwnProperty(key);
  }

  /**
   * Sets the specified property's value, or creates and sets the property if it
   * does not yet exist.
   * @example
   * hotTile.set("vegetation", ["cactus", "tumbleweed", "wildflowers"]);
   * //Chaining
   * hotTile.set("one", 1).set("two", 2).set("three", 3);
   * @fires Tile#propertyAdded
   * @param {string} key - Name of the property to set/create
   * @param {*} value - Value of the property
   * @returns {Tile} The Tile object
   */
  set(key, value) {
    let alreadyHadProperty = this.hasProperty(key);
    this._state[key] = value;
    if (!alreadyHadProperty) {
      /**
       * Fired when a new property is added to a tile. It is NOT fired when
       * a property is solely modified.
       * @event Tile#propertyAdded
       * @type {object}
       * @property {Tile} tile - the tile that was modified
       * @property {string} property - the property that was added
       */
      this.emitEvent("propertyAdded", [{tile: this, property: key}]);
    }
    return this;
  }

  /**
   * Deletes the specified property, removing it from the Tile completely
   * @example
   * let didDeleteSomething = hotTile.delete("temperature");
   * @fires Tile#propertyDeleted
   * @param {string} key - Name of the property to delete
   * @returns {boolean} True if an item was actually deleted, false otherwise
   */
  delete(key) {
    if (this._state.hasOwnProperty(key)) {
      delete this._state[key];
      /**
       * Fired when a property is deleted from a tile
       * @event Tile#propertyDeleted
       * @type {object}
       * @property {Tile} tile - the tile that was modified
       * @property {string} property - the property that was deleted
       */
      this.emitEvent("propertyDeleted", [{tile: this, property: key}]);
      return true;
    }
    return false;
  }
}

export default Tile;
