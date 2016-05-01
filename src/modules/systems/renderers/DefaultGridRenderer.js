import ISystem from "../ISystem";
import Theme from "../../themes/Theme";
import HexGrid from "../../grid/HexGrid";

/**
 * The default renderer of all tiles in the grid
 */
class DefaultGridRenderer extends ISystem {
  /**
   * Constructs a new DefaultGridRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Prepares the system for rendering
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const tiles = app.grid.getTiles();
    const paper = app.paper;
    const { Path, Symbol, Point, Group } = paper;

    /**
     * Prebuild as much of the grid graphics as we can up front. Create a hex
     * path, symbolize it, and then group them together to allow "one-shot"
     * rendering from the update() function.
     */

    // Create a Symbol for the hex path to place for every tile
    let path = new Path.RegularPolygon(paper.view.center, 6, DefaultGridRenderer.HEX_SIZE);
    path.style = Theme.current.defaultHexStyle;
    let hexSymbol = new Symbol(path);

    // Draw each tile, adding each to a group
    this._hexGroup = new Group();
    tiles.forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = coord;
      ({x, y} = HexGrid.coordToPixel(coord, DefaultGridRenderer.HEX_SIZE));

      let instance = hexSymbol.place(new Point(x, y));
      this._hexGroup.addChild(instance);
    });
  }

  /**
   * Draws all tiles in the app's grid
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const paper = app.paper;
    // Draw the grid on its own layer in the middle of the view
    let layer = new paper.Layer();
    layer.addChild(this._hexGroup);
    this._hexGroup.position = paper.view.center;
  }
}

DefaultGridRenderer.HEX_SIZE = 12;

export default DefaultGridRenderer;
