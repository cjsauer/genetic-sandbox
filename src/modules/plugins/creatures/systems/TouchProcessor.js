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
    const grid = app.grid;
    grid.getTilesByComponent("creature").forEach((tile) => {
      let creature = tile.get("creature");
      let coord = tile.get("coord");
      let neighbors = grid.neighborsOf(coord);

      neighbors.forEach((neighbor, index) => {
        let value = 0;
        if (neighbor !== null) {
          if (neighbor.hasComponent("plant")) value = 1;
          else if (neighbor.hasComponent("creature")) value = 0.5;
        }
        creature.brain.input(this._inputs[index], value);
      });
    });
  }
}

export default TouchProcessor;
