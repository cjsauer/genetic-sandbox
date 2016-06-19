import Entity from "../../ecs/Entity";
import Tile from "./components/Tile";
import Coord from "./components/Coord";
import Sprite from "./components/Sprite";

/**
 * Builds a tile entity
 * @param {Coord} coord - coordinate to place the tile entity at
 * @returns {Entity} the built tile entity
 */
export function buildTile(coord) {
  const entity = new Entity();
  entity.addComponent(new Tile());
  entity.addComponent(new Coord(coord.x, coord.y));
  entity.addComponent(new Sprite("tile"));
  return entity;
};
