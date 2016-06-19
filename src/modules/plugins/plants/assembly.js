import Entity from "../../ecs/Entity";
import Plant from "./components/Plant";
import Energy from "../core/components/Energy";
import Sprite from "../core/components/Sprite";

/**
 * Builds a plant entity with the given energy level at the given position
 * @param {number} energyLevel - initial energy level of the plant
 * @param {Coord} coord - coordinate to place the plant entity at
 */
export function buildPlant(energyLevel, coord) {
  const entity = new Entity();
  entity.addComponent(new Plant());
  entity.addComponent(new Energy(energyLevel));
  entity.addComponent(new Sprite("plant"));
  entity.addComponent(coord);
  return entity;
};
