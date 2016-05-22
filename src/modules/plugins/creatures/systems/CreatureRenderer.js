import System from "../../System";
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

    creatureTiles.forEach((tile) => {
      let creature = tile.get("creature");
      let coord = tile.get("coord");
      let { x, y } = HexGrid.coordToPixel(coord, config.core.hexRadius);
      if (!creature.hasOwnProperty("!graphic")) {
        creature["!graphic"] = this._creatureSymbol.place();
      }
      creature["!graphic"].position = new Point(x, y).add(view.center);
    });
  }
}

export default CreatureRenderer;
