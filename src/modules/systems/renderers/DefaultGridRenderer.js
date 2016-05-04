import ISystem from "../ISystem";
import Theme from "../../themes/Theme";
import HexGrid from "../../grid/HexGrid";

/**
 * Used to draw a hexagonal border around all tiles in the grid
 */
class DefaultGridRenderer extends ISystem {
  /**
   * Constructs a new DefaultGridRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Renders the grid
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const tiles = app.grid.getTiles();
    const paper = app.paper;
    const { Path, Symbol, Point, Group, Layer, view } = paper;

    // Make a new layer for the grid
    this._hexLayer = new Layer();
    this._hexGroup = new Group();

    // Create a Symbol for the hex path to place for every tile
    let path = new Path.RegularPolygon(new Point(0, 0), 6, DefaultGridRenderer.HEX_SIZE);
    path.style = Theme.current.defaultHexStyle;
    let hexSymbol = new Symbol(path);

    // Draw each tile, adding each to a group
    tiles.forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = coord;
      ({x, y} = HexGrid.coordToPixel(coord, DefaultGridRenderer.HEX_SIZE));
      let instance = hexSymbol.place(new Point(x, y).add(view.center));
      this._hexGroup.addChild(instance);
    });
  }

  /**
   * Called once per tick. No-op for DefaultGridRenderer.
   * @param {App} app - the currently running GS app
   */
  update(app) {
  }
}

DefaultGridRenderer.HEX_SIZE = 12;

export default DefaultGridRenderer;
