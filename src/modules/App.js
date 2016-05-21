import Random from "random-js";

/**
 * The entry point and hub of the entire application
 * @see {@link HexGrid}
 * @see {@link Plugin}
 */
class App {
  /**
   * Prepares a Genetic Sandbox application for bootstrapping.
   * @param {HexGrid} grid - hex grid to use as the stage
   * @param {Plugin[]} plugins - the plugins to be included in the main
   * processing loop
   * @param {PaperScope} paperScope - Paper.js graphics context
   * @param {number} [seed] - the seed for the random number generator
   */
  constructor(grid, plugins, paperScope, seed) {
    /**
     * A grid of tiles serving as the main stage of the simulation
     * @type {HexGrid}
     */
    this.grid = grid;

    /**
     * Array of plugins included in the main processing loop
     * @type {Plugin[]}
     */
    this.plugins = plugins;

    /**
     * Paper.js graphics context used for rendering vector graphics to a
     * canvas element
     * @type {PaperScope}
     */
    this.paper = paperScope;

    if (seed === undefined) {
      /**
      * An seeded instance of the random-js Mersenne Twister engine for
      * generating random numbers
      */
      this.random = new Random(Random.engines.mt19937().autoSeed());
    } else {
      this.random = new Random(Random.engines.mt19937().seed(seed));
    }
  }

  /**
   * Helper function for calling the given function with every system
   * in all enabled plugins as an argument
   * @private
   * @param {Function} func - the function to apply with every system
   */
  _forEachSystem(func) {
    this.plugins.forEach((plugin) => {
      if (plugin.enabled) {
        plugin.systems.forEach((system) => {
          func(system);
        });
      }
    });
  }

  /**
   * Initializes all enabled plugins by calling *reserve()* and *initialize()*
   * on their constituent systems
   */
  initialize() {
    this._forEachSystem((system) => system.reserve(this));
    this._forEachSystem((system) => system.initialize(this));
  }

  /**
   * Ticks the simulation forward by one full iteration
   */
  tick() {
    this._forEachSystem((system) => system.update(this));
    this._forEachSystem((system) => system.draw(this));
    this._forEachSystem((system) => system.sense(this));
    this._forEachSystem((system) => system.think(this));
    this._forEachSystem((system) => system.attempt(this));
    this.paper.view.draw();
  }

  /**
   * Kicks off the processing loop to continously update all systems
   */
  run() {
    this._timer = setInterval(this.tick.bind(this), 1000);
    this.tick();
  }

  /**
   * Stops the processing loop, essentially pausing the entire simulation
   */
  stop() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}

export default App;
