import ISystem from "../ISystem";
import Plant from "../../components/Plant";

/**
 * Generates initial plant life, placing Plant components into Tiles
 * @extends ISystem
 * @see {@link Plant}
 */
class PlantGenerator extends ISystem {
  /**
   * Constructs a new PlantGenerator
   */
  constructor() {
    super("generator");
  }

   /**
    * Seeds the world with plants
    * @param {App} app - the currently running GS app
    */
  initialize(app) {
    const random = app.random;
    const tiles = app.grid.getTiles();
    tiles.forEach((tile) => {
      if (random.bool(PlantGenerator.VEGETATION_RATE)) {
        tile.set("plant", new Plant(10));
      }
    });
  }

  /**
   * A no-op for generators
   * @param {App} app - the currently running GS app
   */
  update(app) {
  }
}

PlantGenerator.VEGETATION_RATE = 0.1;

export default PlantGenerator;
