/**
 * Interface for defining new systems. A system in Genetic Sandbox is a class
 * containing logic that operates in some way on [Tiles]{@link Tile} within the
 * [HexGrid]{@link HexGrid}.
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
     * Defines the overall role of this system. One of "renderer", "generator",
     * or "processor".
     * @type {string}
     */
    this.tag = tag;
  }

  /**
   * Hook for reserving input and ouput neurons in the Brain
   * @param {App} app - the currently running GS app
   */
  reserve(app) {
  }

  /**
   * Initializes this system allowing it to perform one-time preparation logic
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
  }

  /**
   * Hook for updating the state of the world
   * @param {App} app - the currently running GS app
   */
  update(app) {
  }

  /**
   * Called once per frame to perform drawing logic
   * @param {App} app - the currently running GS app
   */
  draw(app) {
  }

  /**
   * Hook for inputting sense data into the brain
   * @param {App} app - the currently running GS app
   */
  sense(app) {
  }

  /**
   * Hook for activating the all creature brains
   * @private
   * @param {App} app - the currently running GS app
   */
  think(app) {
  }

  /**
   * Hook for reading output data from the brain and attempting actions
   * @param {App} app - the currently running GS app
   */
  attempt(app) {
  }
}

export default System;
