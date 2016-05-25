import System from "../../System";
import Brain from "../../core/components/Brain";
import Coord from "../../core/components/Coord";
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
   * Prepares the system for use
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    /**
     * Holds all planned moves between the attemp() and update() phases
     * @private
     * @type {Object}
     */
    this._movePlans = {};
  }

  /**
   * Makes plans to move a creature in the most prevailing direction signaled
   * by the brain
   * @param {App} app - the currently running GS app
   */
  attempt(app) {
    // Clear move plans from last round
    this._movePlans = {};

    const grid = app.grid;
    grid.getTilesByComponent("creature").forEach((tile) => {
      let creature = tile.get("creature");
      let coord = tile.get("coord");
      this._movePlans[coord.x + "," + coord.y] = this._calculatePreferredDirection(creature);
    });
  }

  /**
   * Moves creature to their planned positions
   * @param {App} app - the currently running GS app
   */
  update(app) {
    // For each movement plan...
    Object.keys(this._movePlans).forEach((key) => {
      // Grab the source tile
      let [x, y] = key.split(",").map((k) => +k);
      let sourceTile = app.grid.getTile(new Coord(x, y));

      try {
        let dir = this._movePlans[key];
        // Tile the creature is trying to move to
        let destinationTile = app.grid.getTile(new Coord(x + dir.x, y + dir.y));

        // Move the creature to the destination tile if it exists and is open
        let creature = sourceTile.get("creature");
        if (creature !== undefined && !destinationTile.hasComponent("creature") && sourceTile !== destinationTile) {
          sourceTile.delete("creature");
          destinationTile.set("creature", creature);
          creature.expend(config.creatures.moveCost);
        }
      } catch (e) {}
    });
  }

  /**
   * Given a creature, calculates the most prevailing direction this creature
   * wants to move in returned as a Coord
   * @private
   * @param {Creature} creature - creature component
   * @returns {Coord} the direction the creature is trying to move in
   */
  _calculatePreferredDirection(creature) {
    const outputs = this._outputs.map((id) => { return creature.brain.output(id); });
    const maxValue = Math.max.apply(null, outputs);
    const maxCount = outputs.filter((val) => { return val === maxValue; }).length;

    if (maxCount > 1) {
      // In the event of a tie, choose not to move
      return this._directionFromIndex(0);
    } else {
      // Otherwise calculate the movement direction
      const maxIndex = outputs.findIndex((val) => { return val === maxValue; });
      return this._directionFromIndex(maxIndex);
    }
  }

  /**
   * Given an index of a nueral output, returns the direction
   * @private
   * @param {number} index - an index of the neural output array between [0, 6]
   * @returns {Coord} the direction of that index
   */
  _directionFromIndex(index) {
    switch (index) {
      case 0:
        return new Coord(0, 0);
      case 1:
        return new Coord(1, 0);
      case 2:
        return new Coord(0, 1);
      case 3:
        return new Coord(-1, 1);
      case 4:
        return new Coord(-1, 0);
      case 5:
        return new Coord(0, -1);
      case 6:
        return new Coord(1, -1);
    }
  }
}

export default MovementProcessor;
