import EventEmitter from "wolfy87-eventemitter";

/**
 * A Tile is a collection of named {@link Components} (data) representing
 * the state at a specific place in a grid
 * @see {@link Component}
 */
class Tile extends EventEmitter {
  /**
   * Creates a new tile with initial components. Note that the given initial
   * components object will be copied *by value* into each tile. What this means
   * is that inner objects of the component are *not* deep copied.
   * @example
   * const hotTile = new Tile({
   *   temperature: 110,
   *   biome: "desert"
   *   vegetation: [
   *     { type: "tree", edible: false },
   *     { type: "berries", edible: true}
   *   ]
   * });
   * @param {Object} [initialComponents={}] - Initial components of the Tile
   */
  constructor(initialComponents = {}) {
    super();
    this._state = Object.assign({}, initialComponents);
  }

  /**
   * Returns the specified component
   * @example
   * let temperature = hotTile.get("temperature");
   * @param {string} name - Name of the component
   * @returns {*} component data, or undefined if component not found
   */
  get(name) {
    return this._state[name];
  }

  /**
   * Returns true if this Tile has the given component, false otherwise
   * @param {string} name - the name of the component to check for
   * @returns {boolean} True if the Tile has the given component, false
   * otherwise
   */
  hasComponent(name) {
    return this._state.hasOwnProperty(name);
  }

  /**
   * Sets the specified component
   * @example
   * hotTile.set("vegetation", [
   *   { type: "tree", edible: false }
   * ]);
   * //Chaining
   * hotTile.set("one", 1).set("two", 2).set("three", 3);
   * @fires Tile#componentAdded
   * @param {string} name - name of the component to set
   * @param {*} component - the component data
   * @returns {Tile} The Tile object
   */
  set(name, component) {
    let alreadyHadComponent = this.hasComponent(name);
    this._state[name] = component;
    if (!alreadyHadComponent) {
      /**
       * Fired when a new component is added to a tile. It is NOT fired when
       * a component is solely modified.
       * @event Tile#componentAdded
       * @type {object}
       * @property {Tile} tile - the tile that was modified
       * @property {string} name - the name of the component that was added
       */
      this.emitEvent("componentAdded", [{ tile: this, name }]);
    }
    return this;
  }

  /**
   * Deletes the specified component, removing it from the Tile completely
   * @example
   * let didDeleteSomething = hotTile.delete("temperature");
   * @fires Tile#componentDeleted
   * @param {string} name - name of the component to delete
   * @returns {boolean} True if an item was actually deleted, false otherwise
   */
  delete(name) {
    if (this._state.hasOwnProperty(name)) {
      delete this._state[name];
      /**
       * Fired when a component is deleted from a tile
       * @event Tile#componentDeleted
       * @type {object}
       * @property {Tile} tile - the tile that was modified
       * @property {string} name - name of the component that was deleted
       */
      this.emitEvent("componentDeleted", [{ tile: this, name }]);
      return true;
    }
    return false;
  }
}

export default Tile;
