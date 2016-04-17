import HexGrid from "./grid/HexGrid";

/**
 * The entry point of the entire application. App contains references to the
 * grid and an array of systems.
 * @see {HexGrid}
 * @see {ISystem}
 */
class App {
  /**
   * Prepares the Genetic Sandbox application for bootstrapping.
   * @param {Array.ISystem} systems - the systems to be included in the main
   * processing loop
   */
  constructor(systems) {
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
  }

  /**
   * Initializes every System in the systems array
   */
  initialize() {
    this.systems.forEach((system) => {
      system.initialize(this.grid);
    });
  }

  /**
   * Updates every System in the systems array
   */
  update() {
    this.systems.forEach((system) => {
      system.update(this.grid);
    });
  }
}

App.GRID_RADIUS = 25;

export default App;
