import System from "../../../ecs/System";
import Coord from "../../core/components/Coord";
import { buildPlant } from "../assembly";
import config from "../../../config";

/**
 * Causes new plants to take seed and grow
 * @extends System
 */
class RegrowthProcessor extends System {
  /**
   * Gives every plant a chance to seed a neighboring tile
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const { world, grid, random } = app;
    const plants = world.getEntitiesWith("plant");

    plants.forEach((plant) => {
      // Consider the neighboring coordinates of this plant in a random order
      const neihbors = grid.neighborsOf(plant.getComponent("coord"));
      random.shuffle(neihbors);
      for (let i = 0; i < neihbors.length; i++) {
        if (!grid.isValidCoord(neihbors[i])) continue;
        let entities = world.getEntitiesAt(neihbors[i]);
        // If there isn't anything other than a tile entity there
        if (!entities.some((e) => { return !e.hasComponent("tile"); })) {
          if (random.bool(config.plants.regrowthRate)) {
            const newPlant = buildPlant(config.plants.plantEnergy, new Coord(neihbors[i].x, neihbors[i].y));
            world.addEntity(newPlant);
            break;
          }
        }
      }
    });
  }
}

export default RegrowthProcessor;
