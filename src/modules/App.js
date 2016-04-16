import HexGrid from "./grid/HexGrid";

/**
 * The entry point of the entire application
 */
class App {
  /**
   * Bootstraps the Genetic Sandbox application, instantiating a HexGrid
   * and defining all Systems.
   */
  constructor() {
    this.grid = new HexGrid(App.GRID_RADIUS);

    // Add systems to this list to be included in the processing loop
    this.systems = [
    ];
  }

  /**
   * Initializes every System in the systems array
   */
  initialize() {
    this.systems.forEach((system) => {
      system.initialize();
    });
  }

  /**
   * Updates every System in the systems array
   */
  update() {
    this.systems.forEach((system) => {
      system.update();
    });
  }
}

App.GRID_RADIUS = 25;

export default App;
