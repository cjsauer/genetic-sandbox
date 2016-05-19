import Random from "random-js";

/**
 * The entry point and hub of the entire application
 * @see {@link HexGrid}
 * @see {@link System}
 */
class App {
  /**
   * Prepares a Genetic Sandbox application for bootstrapping.
   * @param {HexGrid} grid - hex grid to use as the stage
   * @param {Array.<System>} systems - the systems to be included in the main
   * processing loop
   * @param {PaperScope} paperScope - Paper.js graphics context
   * @param {number} [seed] - the seed for the random number generator
   */
  constructor(grid, systems, paperScope, seed) {
    /**
     * A grid of tiles serving as the main stage of the simulation
     * @type {HexGrid}
     */
    this.grid = grid;

    /**
     * Array of systems included in the main processing loop
     * @type {Array.System}
     */
    this.systems = systems;

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
   * Initializes every System in the systems array
   */
  initialize() {
    this.systems.forEach((system) => {
      system.initialize(this);
    });
  }

  /**
   * Updates every System in the systems array
   */
  update() {
    this.systems.forEach((system) => {
      system.update(this);
    });
    this.paper.view.draw();
  }

  /**
   * Kicks off the processing loop to continously update all systems
   */
  run() {
    this._timer = setInterval(this.update.bind(this), 1000);
    this.update();
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
