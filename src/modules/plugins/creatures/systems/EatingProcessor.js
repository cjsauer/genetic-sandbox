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
    const plants = world.getEntitiesWith("plant");

    creatures.forEach((creature) => {
      plants.forEach((plant) => {
        let creatureCoord = creature.getComponent("coord");
        let plantCoord = plant.getComponent("coord");

        if (creatureCoord.equalTo(plantCoord)) {
          let creatureEnergy = creature.getComponent("energy");
          let plantEnergy = plant.getComponent("energy");

          creatureEnergy.gain(plantEnergy.level);
          world.removeEntity(plant);
        }
      });
    });
  }
}

export default EatingProcessor;
