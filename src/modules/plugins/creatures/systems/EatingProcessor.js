import System from "../../../ecs/System";

/**
 * Processes the eating of plants by creatures
 * @extends System
 */
class EatingProcessor extends System {
  /**
   * Constructs a new EatingProcessor
   */
  constructor() {
    super("processor");
  }

  /**
   * Resolves the event of a creature and plant residing in the same tile
   * to the creature eating that plant
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const world = app.world;
    const creatures = world.getEntitiesWith("creature");

    creatures.forEach((creature) => {
      let creatureCoord = creature.getComponent("coord");
      let collisions = world.getEntitiesAt(creatureCoord);

      collisions.forEach((entity) => {
        // Don't collide with self
        if (entity.id !== creature.id && entity.hasComponent("plant")) {
          let creatureEnergy = creature.getComponent("energy");
          let plantEnergy = entity.getComponent("energy");
          creatureEnergy.gain(plantEnergy.level);
          world.removeEntity(entity);
        }
      });
    });
  }
}

export default EatingProcessor;
