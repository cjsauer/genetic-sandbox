import System from "../../../ecs/System";
import config from "../../../config";
import { buildDefaultCreature } from "../assembly";

/**
 * Generates initial creatures
 * @extends System
 */
class CreatureGenerator extends System {
  /**
   * Constructs a new CreatureGenerator
   */
  constructor() {
    super("generator");
  }

   /**
    * Seeds the world with creatures
    * @param {App} app - the currently running GS app
    */
  initialize(app) {
    const { world, random } = app;
    const tiles = world.getEntitiesWith("tile");

    tiles.forEach((tile) => {
      if (random.bool(config.creatures.creatureRate)) {
        const coord = tile.getComponent("coord");
        const creature = buildDefaultCreature(coord, random);
        world.addEntity(creature);
      }
    });
  }
}

export default CreatureGenerator;
