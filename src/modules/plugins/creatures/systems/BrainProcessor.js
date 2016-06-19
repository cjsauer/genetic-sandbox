import System from "../../../ecs/System";

/**
 * Activates the brains of all creatures
 * @extends System
 */
class BrainProcessor extends System {
  /**
   * Constructs a new BrainProcessor
   */
  constructor() {
    super("processor");
  }

  /**
   * Activates the brain of every creature
   * @param {App} app - the currently running GS app
   */
  think(app) {
    app.world.getEntitiesWith("brain").forEach((entity) => {
      let brain = entity.getComponent("brain");
      brain.activate();
    });
  }
}

export default BrainProcessor;
