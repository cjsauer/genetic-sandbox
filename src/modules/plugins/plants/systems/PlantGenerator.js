import System from "../../../ecs/System";
import config from "../../../config";
import { buildPlant } from "../assembly";

/**
 * Generates initial plant life
 * @extends System
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
    const { world, random } = app;
    const tiles = world.getEntitiesWith("tile");

    tiles.forEach((tile) => {
      if (random.bool(config.plants.vegetationRate)) {
        const coord = tile.getComponent("coord");
        const plant = buildPlant(config.plants.plantEnergy, coord);
        world.addEntity(plant);
      }
    });
  }
}

export default PlantGenerator;
