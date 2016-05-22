import System from "../../System";
import config from "../../../config";

/**
 * Ages creatures, removing them if they run out of energy
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
   * Expends energy (ages) creatures, removing them if they run out of energy
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const grid = app.grid;
    grid.getTilesByComponent("creature").forEach((tile) => {
      const creature = tile.get("creature");
      creature.expend(config.creatures.tickCost);
      if (!creature.alive) {
        tile.delete("creature");
      }
    });
  }
}

export default AgingProcessor;
