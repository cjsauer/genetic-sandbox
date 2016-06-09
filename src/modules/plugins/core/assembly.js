import Entity from "../../ecs/Entity";
import Tile from "./components/Tile";
import Sprite from "./components/Sprite";

/**
 * Builds a tile entity
 * @param {Coord} coord - coordinate to place the tile entity at
 * @returns {Entity} the built tile entity
 */
export function buildTile(coord) {
  const entity = new Entity();
  entity.addComponent(new Tile());
  entity.addComponent(coord);
  entity.addComponent(new Sprite("tile"));
  return entity;
};
