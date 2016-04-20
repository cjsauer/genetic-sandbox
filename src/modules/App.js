import HexGrid from "./grid/HexGrid";

/**
 * The entry point of the entire application. App contains references to the
 * grid, an array of systems, and a reference to a
 * [Paper]{@link http://paperjs.org} context.
 * @see {HexGrid}
 * @see {ISystem}
 */
class App {
  /**
   * Prepares the Genetic Sandbox application for bootstrapping.
   * @param {Array.ISystem} systems - the systems to be included in the main
   * processing loop
   * @param {PaperScope} paperScope - Paper.js graphics context
   */
  constructor(systems, paperScope) {
    /**
     * A grid of tiles serving as the main stage of the simulation
     * @type HexGrid
     */
    this.grid = new HexGrid(App.GRID_RADIUS);

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
  }

  /**
   * Kicks off the processing loop to continously update all systems
   */
  run() {
    // TODO: implement a more formal game loop
    this.update();
    this.paper.view.draw();
  }
}

App.GRID_RADIUS = 25;

export default App;
