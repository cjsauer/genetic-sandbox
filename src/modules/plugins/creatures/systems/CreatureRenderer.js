import _ from "lodash";
import System from "../../../ecs/System";
import Theme from "../../../themes/Theme";
import HexGrid from "../../../grid/HexGrid";
import config from "../../../config";

/**
 * Renders creatures for all tiles that contain a Creature component
 * @extends System
 */
class CreatureRenderer extends System {
  /**
   * Constructs a new CreatureRenderer
   */
  constructor() {
    super("renderer");
  }

  /**
   * Prepares the system for rendering creature graphics
   * @param {App} app - the currently running GS app
   */
  initialize(app) {
    const { Layer, Path, Symbol } = app.paper;

    // Make a new layer for creatures
    this._creatureLayer = new Layer();

    // Build out the creature graphic
    const path = new Path.Circle({
      radius: config.core.hexRadius - 5,
      fillColor: Theme.current.defaultCreatureColor
    });

    this._creatureSymbol = new Symbol(path);
  }

  /**
   * Renders a creature graphic for every tile that contains a Creature component
   * @param {App} app - the currently running GS app
   */
  draw(app) {
    const { Point, view } = app.paper;

    let creatureTiles = app.grid.getTilesByComponent("creature");
    let creatureGraphicTiles = app.grid.getTilesByComponent("!creature");
    let tilesOfInterest = _.xor(creatureTiles, creatureGraphicTiles);

    /* Tiles that contain both "creature" and "!creature" components are of no
     * interest; there is a creature there and it has already been rendered.
     * What we want is the symmetric difference, or creatures that contain
     * explicity either "creature" OR "!creature". Tiles that contain *only* "creature"
     * need a graphic, and tiles that contain *only* "!creature" need the graphic
     * removed. There's no creature there anymore!
     */
    tilesOfInterest.forEach((tile) => {
      if (tile.hasComponent("creature")) {
        let coord = tile.get("coord");
        let { x, y } = HexGrid.coordToPixel(coord, config.core.hexRadius);
        let instance = this._creatureSymbol.place(new Point(x, y).add(view.center));
        tile.set("!creature", instance);
      } else {
        tile.get("!creature").remove();
        tile.delete("!creature");
      }
    });
  }
}

export default CreatureRenderer;
