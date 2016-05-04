/**
 * The entry point and hub of the entire application
 * @see {@link HexGrid}
 * @see {@link ISystem}
 */
class App {
  /**
   * Prepares a Genetic Sandbox application for bootstrapping.
   * @param {HexGrid} grid - hex grid to use as the stage
   * @param {Array.<ISystem>} systems - the systems to be included in the main
   * processing loop
   * @param {PaperScope} paperScope - Paper.js graphics context
   */
  constructor(grid, systems, paperScope) {
    /**
     * A grid of tiles serving as the main stage of the simulation
     * @type {HexGrid}
     */
    this.grid = grid;

    /**
     * Array of systems included in the main processing loop
     * @type {Array.ISystem}
     */
    this.systems = systems;

    /**
     * Paper.js graphics context used for rendering vector graphics to a
     * canvas element
     * @type {PaperScope}
     */
    this.paper = paperScope;
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
