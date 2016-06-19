import System from "../../../ecs/System";
import Brain from "../../creatures/components/Brain";

/**
 * Inputs touch sense data into the brains of creatures
 * @extends System
 */
class TouchProcessor extends System {
  /**
   * Constructs a new TouchProcessor
   */
  constructor() {
    super("processor");
  }

  /**
   * Reserves 6 input neurons, one for each touch direction
   * @param {App} app - the currently running GS app
   */
  reserve(app) {
    this._inputs = [
      Brain.reserveInput(),
      Brain.reserveInput(),
      Brain.reserveInput(),
      Brain.reserveInput(),
      Brain.reserveInput(),
      Brain.reserveInput()
    ];
  }

  /**
   * Inputs touch sense data into the brain. Inputs a 1 for plant, 0.5 for
   * creature, and 0 for no item present.
   * @param {App} app - the currently running GS app
   */
  sense(app) {
    const { world, grid } = app;
    const creatures = world.getEntitiesWith("creature");
    const plants = world.getEntitiesWith("plant");

    creatures.forEach((creature) => {
      let coord = creature.getComponent("coord");
      let brain = creature.getComponent("brain");
      let neighbors = grid.neighborsOf(coord);

      neighbors.forEach((neighbor, index) => {
        let value = 0;
        let creaturePresent = creatures.some((creature) => {
          return creature.getComponent("coord").equalTo(neighbor);
        });

        if (creaturePresent) {
          value = 0.5;
        } else {
          let plantPresent = plants.some((plant) => {
            return plant.getComponent("coord").equalTo(neighbor);
          });

          if (plantPresent) {
            value = 1;
          }
        }
        brain.input(this._inputs[index], value);
      });
    });
  }
}

export default TouchProcessor;
