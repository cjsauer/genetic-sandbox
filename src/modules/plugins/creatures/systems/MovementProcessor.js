import System from "../../../ecs/System";
import Brain from "../../creatures/components/Brain";
import Coord from "../../core/components/Coord";
import Velocity from "../../core/components/Velocity";
import config from "../../../config";

/**
 * Processes locomotion for creatures
 * @extends System
 */
class MovementProcessor extends System {
  /**
   * Constructs a new MovementProcessor
   */
  constructor() {
    super("processor");
  }

  /**
   * Reserves 7 output neurons, one for each direction plus no direction
   * @param {App} app - the currently running GS app
   */
  reserve(app) {
    this._outputs = [
      Brain.reserveOutput(),
      Brain.reserveOutput(),
      Brain.reserveOutput(),
      Brain.reserveOutput(),
      Brain.reserveOutput(),
      Brain.reserveOutput(),
      Brain.reserveOutput()
    ];
  }

  /**
   * Sets creature's velocity to the most prevailing direction signaled by the
   * brain
   * @param {App} app - the currently running GS app
   */
  attempt(app) {
    const world = app.world;
    world.getEntitiesWith("creature", "brain").forEach((creature) => {
      let velocity = creature.getComponent("velocity");
      let brain = creature.getComponent("brain");
      let dir = this._calculatePreferredVelocity(brain);
      velocity.x = dir.x;
      velocity.y = dir.y;
    });
  }

  /**
   * Moves creature to their planned positions
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const { world, grid } = app;
    const creatures = world.getEntitiesWith("creature", "velocity");

    creatures.forEach((creature) => {
      let coord = creature.getComponent("coord");
      let velocity = creature.getComponent("velocity");
      let destination = new Coord(coord.x + velocity.x, coord.y + velocity.y);

      if (!coord.equalTo(destination) && grid.isValidCoord(destination)) {
        // Check if there are any other creatures already there
        let alreadyOccupied = world.getEntitiesAt(destination).some((entity) => {
          return entity.hasComponent("creature");
        });

        if (!alreadyOccupied) {
          let energy = creature.getComponent("energy");
          energy.expend(config.creatures.moveCost);
          coord.x = destination.x;
          coord.y = destination.y;
        }
      }
    });
  }

  /**
   * Given a brain, calculates the most prevailing direction it wants to move in
   * returned as a Velocity
   * @private
   * @param {Brain} brain - the brain
   * @returns {Velocity} the direction the creature is trying to move in
   */
  _calculatePreferredVelocity(brain) {
    const outputs = this._outputs.map((id) => { return brain.output(id); });
    const maxValue = Math.max.apply(null, outputs);
    const maxCount = outputs.filter((val) => { return val === maxValue; }).length;

    if (maxCount > 1) {
      // In the event of a tie, choose not to move
      return this._velocityFromIndex(0);
    } else {
      // Otherwise return the proper velocity
      const maxIndex = outputs.findIndex((val) => { return val === maxValue; });
      return this._velocityFromIndex(maxIndex);
    }
  }

  /**
   * Given an index of a nueral output, returns the velocity intended
   * @private
   * @param {number} index - an index of the neural output array between [0, 6]
   * @returns {Velocity} the velocity for the given index
   */
  _velocityFromIndex(index) {
    switch (index) {
      case 0:
        return new Velocity(0, 0);
      case 1:
        return new Velocity(1, 0);
      case 2:
        return new Velocity(0, 1);
      case 3:
        return new Velocity(-1, 1);
      case 4:
        return new Velocity(-1, 0);
      case 5:
        return new Velocity(0, -1);
      case 6:
        return new Velocity(1, -1);
    }
  }
}

export default MovementProcessor;
