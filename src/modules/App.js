import Random from "random-js";

/**
 * The context and heartbeat of the Genetic Sandbox simulation
 * @see {@link World}
 * @see {@link HexGrid}
 * @see {@link Plugin}
 */
class App {
  /**
   * Creates a new App, setting up the context for the rest of the simulation
   * @param {World} world - world instance
   * @param {HexGrid} grid - grid implementation to use for grid-related
   * computation
   * @param {PaperScope} paperScope - Paper.js graphics context
   */
  constructor(world, grid, paperScope) {
    /**
     * The World, or manager of all entities
     * @type {World}
     */
    this.world = world;

    /**
     * Grid implementation to use for grid-related computation
     * @type {HexGrid}
     */
    this.grid = grid;

    /**
     * Paper.js graphics context used for rendering vector graphics to a
     * canvas element
     * @type {PaperScope}
     */
    this.paper = paperScope;
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
   * Initializes all enabled plugins passed by calling *reserve()* and
   * *initialize()* on their constituent systems. Can optionally be passed a
   * seed to prime the random number generator with for this simulation.
   * @param {Plugin[]} plugins - the plugins to be included in the main
   * processing loop
   * @param {number} [seed] - the seed for the random number generator
   */
  initialize(plugins, seed) {
    /**
    * Array of plugins included in the main processing loop
    * @type {Plugin[]}
    */
    this.plugins = plugins;

    if (seed === undefined) {
      /**
      * A seeded instance of the random-js Mersenne Twister engine for
      * generating random numbers
      */
      this.random = new Random(Random.engines.mt19937().autoSeed());
    } else {
      this.random = new Random(Random.engines.mt19937().seed(seed));
    }

    this._forEachSystem((system) => system.reserve(this));
    this._forEachSystem((system) => system.initialize(this));
  }

  /**
   * Ticks the simulation forward by one full iteration
   */
  tick() {
    this.world.update();
    this._forEachSystem((system) => system.update(this));
    this._forEachSystem((system) => system.draw(this));
    this.paper.view.draw();
    this._forEachSystem((system) => system.sense(this));
    this._forEachSystem((system) => system.think(this));
    this._forEachSystem((system) => system.attempt(this));
  }

  /**
   * Kicks off the processing loop to continously update all systems
   */
  run() {
    this._timer = setInterval(this.tick.bind(this), 100);
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
