import ISystem from "../ISystem";
import Plant from "../../components/Plant";

/**
 * Generates initial plant life, placing Plant components into Tiles
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
    let tiles = app.grid.getTiles();
    tiles.forEach((tile) => {
      let chance = Math.random();
      if (chance < PlantGenerator.VEGETATION_RATE) {
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
