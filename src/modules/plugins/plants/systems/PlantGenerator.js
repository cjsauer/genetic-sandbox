import System from "../../System";
import Plant from "../components/Plant";
import config from "../../../config";

/**
 * Generates initial plant life, placing Plant components into Tiles
 * @extends System
 * @see {@link Plant}
 */
class PlantGenerator extends System {
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
      if (random.bool(config.plants.vegetationRate)) {
        tile.set("plant", new Plant(config.plants.plantEnergy));
      }
    });
  }
}

export default PlantGenerator;
