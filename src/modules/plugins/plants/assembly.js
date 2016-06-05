import Entity from "../../ecs/Entity";
import Plant from "./components/Plant";
import Energy from "../core/components/Energy";

/**
 * Builds a plant entity with the given energy level at the given position
 * @param {number} energyLevel - initial energy level of the plant
 * @param {Coord} coord - coordinate to place the plant entity at
 */
export function buildPlant(energyLevel, coord) {
  const entity = new Entity();
  entity.addComponent(new Plant());
  entity.addComponent(new Energy(energyLevel));
  entity.addComponent(coord);
  return entity;
};
