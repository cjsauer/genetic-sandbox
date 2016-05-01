import ISystem from "../ISystem";
import Theme from "../../themes/Theme";
import DefaultGridRenderer from "./DefaultGridRenderer";
import HexGrid from "../../grid/HexGrid";

/**
 * Renders plants for tiles that contain a vegetation component
 */
class DefaultPlantRenderer extends ISystem {
  /**
   * Constructs a new DefaultPlantRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Prepares the system for rendering plant graphics
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const { Group, Path, Symbol } = app.paper;

    // Build out the plant graphic and group it as a single item

    let blades = new Group();
    let bladeCount = 4;
    let bladeWidth = 2;
    let bladeHeight = 12;
    for (let i = 0; i < bladeCount; i++) {
      let blade = new Path.Line({
        from: [0, 0],
        to: [0, bladeHeight],
        strokeColor: Theme.current.defaultPlantColor,
        strokeWidth: bladeWidth
      });
      blade.rotate(i * 180 / bladeCount);
      blades.addChild(blade);
    }
    this._plant = new Symbol(blades);
  }

  /**
   * Renders a plant graphic for every tile that contains a vegetation component
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const { Layer, Point, view } = app.paper;
    let plantLayer = new Layer(); // eslint-disable-line

    app.grid.getTilesByComponent("vegetation").forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = HexGrid.coordToPixel(coord, DefaultGridRenderer.HEX_SIZE);
      this._plant.place(new Point(x, y).add(view.center));
    });
  }
}

export default DefaultPlantRenderer;
