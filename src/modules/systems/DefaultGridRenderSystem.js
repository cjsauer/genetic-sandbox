import ISystem from "./ISystem";

/**
 * The default renderer of all tiles in the grid. This renderer is called first,
 * and draws the basic outline of a tile.
 */
class DefaultGridRenderSystem extends ISystem {
  /**
   * Initializes this system allowing it to perform one-time preparation logic
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const paper = app.paper;
    let Path, Symbol, Color;
    ({ Path, Symbol, Color } = paper);

    // Cache reference to all tiles
    this._tiles = app.grid.getTiles();

    // Create a Symbol for the hex path to place for every tile
    let path = new Path.RegularPolygon(paper.view.center, 6, DefaultGridRenderSystem.HEX_SIZE);
    path.style = {
      strokeColor: new Color(1.0, 0.1)
    };
    this._hex = new Symbol(path);
    path.remove();
  }

  /**
   * Draws all tiles in the app's grid
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const Point = app.paper.Point;

    // Draw each tile
    this._tiles.forEach((tile) => {
      let x, y;
      ({x, y} = this._coordToPixel(tile.get("x"), tile.get("y"), DefaultGridRenderSystem.HEX_SIZE));

      let instance = this._hex.place();
      instance.position = new Point(x, y).add(app.paper.view.center);
    });
  }

  /**
   * Converts a tile's coordinates to its pixel coordinates
   * @private
   * @param {number} q - q coordinate of tile (x)
   * @param {number} r - r coordinate of tile (y)
   * @param {number} radius - radius of hexagons (for correct spacing)
   */
  _coordToPixel(q, r, radius) {
    return {
      x: radius * Math.sqrt(3) * (r + (q / 2)),
      y: radius * (3 / 2) * q
    };
  }
}

DefaultGridRenderSystem.HEX_SIZE = 12;

export default DefaultGridRenderSystem;
