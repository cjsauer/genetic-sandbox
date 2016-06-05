import Entity from "../../ecs/Entity";
import Tile from "./components/Tile";

/**
 * Builds a tile entity
 * @param {Coord} coord - coordinate to place the tile entity at
 * @returns {Entity} the built tile entity
 */
export function buildTile(coord) {
  const entity = new Entity();
  entity.addComponent(new Tile());
  entity.addComponent(coord);
  return entity;
};
