import Tile from "./Tile";
import TileComponentIndex from "./TileComponentIndex";
import Coord from "../plugins/core/components/Coord";
import Point from "../shapes/Point";

/**
 * A 2D, hexagonal grid implementation with axial coordinate system.
 * Implementation details can be found [here]{@link http://goo.gl/nLO6sN}.
 * @see {@link Tile}
 * @see {@link Coord}
 */
class HexGrid {
  /**
   * Constructs a new HexGrid of given radius. The pattern of tiles within the
   * grid will then form a hexagon itself with (0,0) being the center.
   * A grid of radius 0 is just a single hexagon, radius 1 is a single hexagon
   * surrounded by 1 layer of hexagons, and so on...
   * @example
   * let myGrid = new HexGrid(10, {
   *    biome: "desert"
   * });
   * @param {number} radius - Number of tiles from center of grid to the edge,
   * not counting the center tile
   * @param {Object} [defaultTileComponents={}] - Default components that all
   * Tiles will be initialized with
   */
  constructor(radius, defaultTileComponents = {}) {
    /* Generate a hex grid. We'll use the constraint in cubic coordinates
     * that x + y + z = 0 to decide where hexes are to be placed before
     * converting to axial coordinates for storage.
     * Note that within this file (x, y, z) refer to cubic coordinates, while
     * (q, r) refer to axial coordinates. The distinction is only present
     * within this file for clarity; everywhere else in the source will use
     * (x, y) notation in favor of familiarity.
     */
    let tiles = [];
    let x, y, z, q, r;
    for (x = -radius; x <= radius; x++) {
      for (y = -radius; y <= radius; y++) {
        for (z = -radius; z <= radius; z++) {
          if ((x + y + z) === 0) {
            // This is a valid hex. Instantiate and store in the tiles array.
            ({q, r} = HexGrid._cubicToAxial(x, y, z));
            if (tiles[r + radius] === undefined) {
              tiles[r + radius] = [];
            }
            // Merge the passed default components with some grid meta data
            let tileComponents = Object.assign({}, defaultTileComponents, {
              coord: new Coord(q, r),
              grid: this
            });
            tiles[r + radius][q + radius + Math.min(0, r)] = new Tile(tileComponents);
          }
        }
      }
    }
    this._tiles = tiles;
    this._radius = radius;
    // Build out the index so we can super quickly look up tiles by component
    this._componentIndex = new TileComponentIndex(this.getTiles());
  }

  /**
   * Returns the Tile at coordinates (x, y)
   * @example
   * let originTile = myGrid.getTile(new Coord(0, 0));
   * @param {Coord} coord - coordinate of tile to fetch
   * @returns {Tile} The tile at the provided coordinates
   */
  getTile({ x: q, y: r }) {
    let xOffset = r + this._radius;
    let yOffset = q + this._radius + Math.min(0, r);

    if (xOffset < 0 ||
        xOffset >= this._tiles.length ||
        yOffset < 0 ||
        yOffset >= this._tiles[xOffset].length) {
      throw new Error(`Attempted to access Tile out of bounds at coordinates (${q}, ${r})`);
    }

    return this._tiles[xOffset][yOffset];
  }

  /**
   * Returns an array of all tiles in the HexGrid
   * @example
   * let tiles = myGrid.getTiles();
   * tiles.forEach((tile) => {
   *   tile.set("temperature", 75).set("forecast", "sunny");
   * });
   * @returns {Array.Tile} Array of all tiles in this HexGrid
   */
  getTiles() {
    /* this._tiles is just an array of arrays. Reduce to a single dimensional
     * array by concatenating them all together. */
    return this._tiles.reduce((prevArray, currArray) => {
      return prevArray.concat(currArray);
    }, []);
  }

  /**
   * Returns all tiles that posess the given component or components
   * @example
   * // Returns all tiles that have "biome" and "temperature" components
   * let habitatTiles = grid.getTilesByComponent(["biome", "temperature"]);
   * @param {(string | Array.string)} names - the names of the components
   * this tile must posess to be included in the result
   * @returns {Array.Tile} the tiles that include all of the given
   * components
   */
  getTilesByComponent(names) {
    return this._componentIndex.getTilesByComponent(names);
  }

  /**
   * Returns the Tiles that are adjacent to the Tile at the provided (x, y) coordinates.
   * @example
   * let neighborsOfOrigin = myGrid.neighborsOf(new Coord(0, 0));
   * neighborsOfOrigin.forEach((tile) => {
   *   tile.set("bordersOrigin", true);
   * });
   * @param {Coord} coord - coordinates of tile for which to calculate neighbors
   * @returns {Array.Tile} The array of neighboring Tiles
   */
  neighborsOf({ x: q, y: r }) {
    return HexGrid._axialUnitDirections.map(([qd, rd]) => {
      try {
        return this.getTile(new Coord(q + qd, r + rd));
      } catch (e) {
        return null;
      }
    }).filter((tile) => {
      return tile !== null;
    });
  }

  /**
   * Calculates the distance between two (x, y) coordinates in tiles
   * @example
   * let myGrid = new HexGrid(2);
   * let distanceFromCenterToEdge = myGrid.distanceBetween(new Coord(0, 0), new Coord(2, -2)); // 2
   * @param {Coord} coord1 - coordinates of first tile
   * @param {Coord} coord2 - coordinates of second tile
   * @returns {number} The distance between the provided coordinates in tiles
   */
  distanceBetween({ x: q1, y: r1 }, { x: q2, y: r2 }) {
    let x1, y1, z1, x2, y2, z2;
    ({x: x1, y: y1, z: z1} = HexGrid._axialToCubic(q1, r1));
    ({x: x2, y: y2, z: z2} = HexGrid._axialToCubic(q2, r2));
    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
  }
}

/**
 * Converts a tile's coordinates to its pixel coordinates
 * @param {Coord} coord - tile coordinates
 * @param {number} radius - radius of hexagons (for correct spacing)
 * @returns {Point} pixel coordinates of center of tile
 */
HexGrid.coordToPixel = (coord, radius) => {
  let { x: q, y: r } = coord;
  return new Point(
    radius * Math.sqrt(3) * (r + (q / 2)),
    radius * (3 / 2) * q
  );
};

// The six unit directions in the axial coordinate system
HexGrid._axialUnitDirections = [
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
  [1, -1]
];

// The six unit directions in the cubic coordinate system
HexGrid._cubicUnitDirections = [
  [1, -1, 0],
  [1, 0, -1],
  [0, 1, -1],
  [-1, 1, 0],
  [-1, 0, 1],
  [0, -1, 1]
];

// Internal helper function for converting from axial coordinates to cubic
HexGrid._axialToCubic = (q, r) => {
  return {
    x: q,
    z: r,
    y: -q - r
  };
};

// Internal helper function for converting from cubic coordinates to axial
HexGrid._cubicToAxial = (x, y, z) => {
  return {
    q: x,
    r: z
  };
};

export default HexGrid;
