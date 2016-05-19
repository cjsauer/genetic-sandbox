import System from "../../System";
import Theme from "../../../themes/Theme";
import GridRenderer from "../../core/systems/GridRenderer";
import HexGrid from "../../../grid/HexGrid";
import _ from "lodash";

/**
 * Renders plants for all tiles that contain a Plant component
 * @extends System
 */
class PlantRenderer extends System {
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
    let tilesOfInterest = _.xor(plantTiles, plantGraphicTiles);

    /* Tiles that contain both "plant" and "!plant" components are of no
     * interest; there is a plant there and it has already been rendered.
     * What we want is the symmetric difference, or plants that contain
     * explicity either "plant" OR "!plant". Tiles that contain *only* "plant"
     * need a graphic, and tiles that contain *only* "!plant" need the graphic
     * removed. There's no plant there anymore!
     */
    tilesOfInterest.forEach((tile) => {
      if (tile.hasComponent("plant")) {
        let coord = tile.get("coord");
        let { x, y } = HexGrid.coordToPixel(coord, GridRenderer.HEX_SIZE);
        let instance = this._plantSymbol.place(new Point(x, y).add(view.center));
        tile.set("!plant", instance);
      } else {
        tile.get("!plant").remove();
        tile.delete("!plant");
      }
    });
  }
}

export default PlantRenderer;
