import ISystem from "../ISystem";
import Theme from "../../themes/Theme";
import GridRenderer from "./GridRenderer";
import HexGrid from "../../grid/HexGrid";
import _ from "underscore";

/**
 * Renders plants for all tiles that contain a Plant component
 * @extends ISystem
 */
class PlantRenderer extends ISystem {
  /**
   * Constructs a new PlantRenderer
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
   * Renders a plant graphic for every tile that contains a Plant component,
   * and removes plant graphics for tiles that no longer have vegetation
   * @param {App} app - the currently running GS app
   */
  update(app) {
    const { Point, view } = app.paper;

    let plantTiles = app.grid.getTilesByComponent("plant");
    let plantGraphicTiles = app.grid.getTilesByComponent("!plant");
    let tilesThatNeedGraphicAdded = _.difference(plantTiles, plantGraphicTiles);
    let tilesThatNeedGraphicRemoved = _.difference(plantGraphicTiles, plantTiles);

    // Add a plant graphic to every tile that needs one
    tilesThatNeedGraphicAdded.forEach((tile) => {
      let coord = tile.get("coord");
      let { x, y } = HexGrid.coordToPixel(coord, GridRenderer.HEX_SIZE);
      let instance = this._plantSymbol.place(new Point(x, y).add(view.center));
      tile.set("!plant", instance);
    });

    // Remove plant graphics from tiles that no longer contain plant
    tilesThatNeedGraphicRemoved.forEach((tile) => {
      tile.get("!plant").remove();
      tile.delete("!plant");
    });
  }
}

export default PlantRenderer;
