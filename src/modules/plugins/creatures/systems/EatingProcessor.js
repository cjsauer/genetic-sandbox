import _ from "lodash";
import System from "../../System";

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
    const grid = app.grid;
    const creatureTiles = grid.getTilesByComponent("creature");
    const plantTiles = grid.getTilesByComponent("plant");
    const tilesOfInterest = _.intersection(creatureTiles, plantTiles);

    tilesOfInterest.forEach((tile) => {
      const creature = tile.get("creature");
      const plant = tile.get("plant");
      creature.eat(plant);
      tile.delete("plant");
    });
  }
}

export default EatingProcessor;
