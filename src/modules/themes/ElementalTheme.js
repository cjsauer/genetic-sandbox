import { Color } from "paper";
import config from "../config";

/**
 * An elemental inspired theme
 */
const ElementalTheme = {
  backgroundStyle: {
    fillColor: new Color("#18303D")
  },

  sprites: {
    // The default sprite drawn when a request is made for a sprite that does
    // not exist
    default(paper) {
      if (ElementalTheme._defaultSymbol === undefined) {
        const { Path, Symbol } = paper;

        const path = new Path.Circle({
          radius: config.core.hexRadius - 5,
          fillColor: "white"
        });
        ElementalTheme._defaultSymbol = new Symbol(path);
      }

      return ElementalTheme._defaultSymbol.place();
    },

    // Tile sprite
    tile(paper) {
      if (ElementalTheme._tileSymbol === undefined) {
        const { Path, Symbol, Point } = paper;

        let path = new Path.RegularPolygon(new Point(0, 0), 6, config.core.hexRadius);
        path.style = {
          strokeColor: new Color(1.0, 0.1)
        };
        ElementalTheme._tileSymbol = new Symbol(path);
      }

      return ElementalTheme._tileSymbol.place();
    },

    // Plant sprite
    plant(paper) {
      if (ElementalTheme._plantSymbol === undefined) {
        const { Path, Symbol, Group } = paper;

        let petals = new Group();
        let petalCount = 4;
        let petalWidth = 2;
        let petalHeight = 12;
        for (let i = 0; i < petalCount; i++) {
          let petal = new Path.Line({
            from: [0, 0],
            to: [0, petalHeight],
            strokeColor: new Color("#347C47"),
            strokeWidth: petalWidth
          });
          petal.rotate(i * 180 / petalCount);
          petals.addChild(petal);
        }
        ElementalTheme._plantSymbol = new Symbol(petals);
      }

      return ElementalTheme._plantSymbol.place();
    },

    // Creature sprite
    creature(paper) {
      if (ElementalTheme._creatureSymbol === undefined) {
        const { Path, Symbol } = paper;

        const path = new Path.Circle({
          radius: config.core.hexRadius - 5,
          fillColor: new Color("#D4964B")
        });

        ElementalTheme._creatureSymbol = new Symbol(path);
      }

      return ElementalTheme._creatureSymbol.place();
    }
  }
};

export default ElementalTheme;
