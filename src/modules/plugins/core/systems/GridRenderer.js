import System from "../../System";
import Theme from "../../../themes/Theme";
import HexGrid from "../../../grid/HexGrid";
import config from "../../../config";

/**
 * Renders a hexagonal border around all tiles in the grid
 * @extends System
 */
class GridRenderer extends System {
  /**
   * Constructs a new GridRenderer
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
    let path = new Path.RegularPolygon(new Point(0, 0), 6, config.core.hexRadius);
    path.style = Theme.current.defaultHexStyle;
    let hexSymbol = new Symbol(path);

    // Draw each tile, adding each to a group
    tiles.forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = coord;
      ({x, y} = HexGrid.coordToPixel(coord, config.core.hexRadius));
      let instance = hexSymbol.place(new Point(x, y).add(view.center));
      this._hexGroup.addChild(instance);
    });
  }
}

export default GridRenderer;
