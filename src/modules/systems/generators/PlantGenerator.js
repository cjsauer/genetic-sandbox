import ISystem from "../ISystem";

/**
 * Generates initial vegetation
 */
class PlantGenerator extends ISystem {
  /**
   * Constructs a new PlantGenerator
   */
  constructor() {
    super("generator");
  }

   /**
    * Seeds the world with vegetation
    * @param {App} app - the currently running GS app
    */
  initialize(app) {
    let tiles = app.grid.getTiles();
    tiles.forEach((tile) => {
      let chance = Math.random();
      if (chance < PlantGenerator.VEGETATION_RATE) {
        tile.set("vegetation", true);
      }
    });
  }
}

PlantGenerator.VEGETATION_RATE = 0.1;

export default PlantGenerator;
