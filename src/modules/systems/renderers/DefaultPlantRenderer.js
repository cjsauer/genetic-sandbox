import ISystem from "../ISystem";
import Theme from "../../themes/Theme";
import DefaultGridRenderer from "./DefaultGridRenderer";
import HexGrid from "../../grid/HexGrid";
import _ from "underscore";

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
    const { Layer, Group, Path, Symbol } = app.paper;

    // Make a new layer and group for plants
    this._plantLayer = new Layer();

    // Build out the plant graphic and symbolize it
    let petals = new Group();
    let petalCount = 4;
    let petalWidth = 2;
    let petalHeight = 12;
    for (let i = 0; i < petalCount; i++) {
      let petal = new Path.Line({
        from: [0, 0],
        to: [0, petalHeight],
        strokeColor: Theme.current.defaultPlantColor,
        strokeWidth: petalWidth
      });
      petal.rotate(i * 180 / petalCount);
      petals.addChild(petal);
    }
    this._plantSymbol = new Symbol(petals);
  }

  /**
   * Renders a plant graphic for every tile that contains a vegetation component,
   * and removing plant graphics for tiles that no longer contain vegetation
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const { Point, view } = app.paper;

    let vegetationTiles = app.grid.getTilesByComponent("vegetation");
    let vegetationGraphicTiles = app.grid.getTilesByComponent("!vegetation");
    let tilesThatNeedGraphicAdded = _.difference(vegetationTiles, vegetationGraphicTiles);
    let tilesThatNeedGraphicRemoved = _.difference(vegetationGraphicTiles, vegetationTiles);

    // Add a plant graphic to every tile that needs one
    tilesThatNeedGraphicAdded.forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = HexGrid.coordToPixel(coord, DefaultGridRenderer.HEX_SIZE);
      let instance = this._plantSymbol.place(new Point(x, y).add(view.center));
      tile.set("!vegetation", instance);
    });

    // Remove plant graphics from tiles that no longer contain vegetation
    tilesThatNeedGraphicRemoved.forEach((tile) => {
      tile.get("!vegetation").remove();
      tile.delete("!vegetation");
    });
  }
}

export default DefaultPlantRenderer;
