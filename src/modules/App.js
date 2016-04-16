import HexGrid from "./grid/HexGrid";

/**
 * The entry point of the entire application
 */
class App {
  /**
   * Bootstraps the Genetic Sandbox application, instantiating a HexGrid
   * and defining all systems
   * @param {Array.ISystem} systems - the systems to be included in the main
   * processing loop
   */
  constructor(systems) {
    /**
     * @type HexGrid
     */
    this.grid = new HexGrid(App.GRID_RADIUS);

    /**
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
