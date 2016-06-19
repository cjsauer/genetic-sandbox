import System from "../../../ecs/System";
import config from "../../../config";

/**
 * Saps energy from creatures every tick
 * @extends System
 */
class AgingProcessor extends System {
  /**
   * Constructs a new AgingProcessor
   */
  constructor() {
    super("processor");
  }

  /**
   * Saps energy from all creatures every tick, removing them if they die
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const world = app.world;
    world.getEntitiesWith("creature").forEach((creature) => {
      const energy = creature.getComponent("energy");
      if (energy.expend(config.creatures.tickCost) <= 0) {
        world.removeEntity(creature);
      }
    });
  }
}

export default AgingProcessor;
