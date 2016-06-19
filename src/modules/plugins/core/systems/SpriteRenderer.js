import System from "../../../ecs/System";
import config from "../../../config";

/**
 * Renders all entities with Coord and Sprite components to the screen
 * @extends System
 */
class SpriteRenderer extends System {
  /**
   * Constructs a new SpriteRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Called once per frame to perform drawing logic
   * @param {App} app - the currently running GS app
   */
  draw(app) {
    const { world, grid, paper } = app;
    const { Point, view } = paper;

    world.getEntitiesWith("coord", "sprite").forEach((entity) => {
      let coord = entity.getComponent("coord");
      let sprite = entity.getComponent("sprite");
      let item = sprite.getItem(paper);

      const { x, y } = grid.coordToPixel(coord, config.core.hexRadius);
      item.position = new Point(x, y).add(view.center);
    });
  }
}

export default SpriteRenderer;
