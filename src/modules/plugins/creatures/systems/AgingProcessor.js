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
    const grid = app.grid;
    grid.getTilesByComponent("creature").forEach((tile) => {
      const creature = tile.get("creature");
      if (!creature.expend(config.creatures.tickCost)) {
        tile.delete("creature");
      }
    });
  }
}

export default AgingProcessor;
