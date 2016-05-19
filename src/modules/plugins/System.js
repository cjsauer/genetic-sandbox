/**
 * Interface for defining new systems. A system in Genetic Sandbox is a class
 * containing initialize() and update() functions that operate in some way on
 * [Tiles]{@link Tile} within the [HexGrid]{@link HexGrid}.
 * @abstract
 */
class System {
  /**
   * System can not be instantiated directly, but instead should be extended
   * and its instance methods overridden.
   * @param {string} tag - one of "renderer", "generator", or "processor"
   */
  constructor(tag) {
    if (this.constructor === System) {
      throw new TypeError("Cannot construct System instances directly");
    }

    /**
     * Defines the role of this system. One of "renderer", "generator", or
     * "processor".
     * @type {string}
     */
    this.tag = tag;
  }

  /**
   * Initializes this system allowing it to perform one-time preparation logic
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    throw new Error("System#initialize must be implemented by a concrete subclass");
  }

  /**
   * Called once per tick to update the simulation
   * @param {App} app - the currently running GS app
   */
  update(app) {
    throw new Error("System#update must be implemented by a concrete subclass");
  }
}

export default System;
