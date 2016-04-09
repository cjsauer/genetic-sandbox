import IGrid from "./IGrid";
import Tile from "./Tile";

/**
 * A 2D, hexagonal grid implementation with axial coordinate system.
 * Implementation details can be found [here]{@link http://goo.gl/nLO6sN}.
 * @see {@link IGrid}
 * @see {@link Tile}
 * @extends IGrid
 */
class HexGrid extends IGrid {
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
   * @param {Object} [defaultTileProps={}] - Default properties that all Tiles
   * will be initialized with
   */
  constructor(radius, defaultTileProps = {}) {
    super();
    this._radius = radius;
    this._tiles = [];

    /* Generate a hex grid. We'll use the constraint in cubic coordinates
     * that x + y + z = 0 to decide where hexes are to be placed before
     * converting to axial coordinates for storage
     */
    let x, y, z, q, r;
    for (x = -radius; x <= radius; x++) {
      for (y = -radius; y <= radius; y++) {
        for (z = -radius; z <= radius; z++) {
          if ((x + y + z) === 0) {
            // This is a valid hex. Instantiate and store in the tiles array.
            ({q, r} = HexGrid._cubicToAxial(x, y, z));
            if (this._tiles[r + radius] === undefined) {
              this._tiles[r + radius] = [];
            }
            this._tiles[r + radius][q + radius + Math.min(0, r)] = new Tile(defaultTileProps);
          }
        }
      }
    }
  }

  /**
   * Returns the Tile at axial coordinates (q, r). q can be read as "column",
   * and r can be read as "row".
   * @example
   * let originTile = myGrid.getTile(0, 0);
   * @param {number} q - q coordinate of Tile to fetch
   * @param {number} r - r coordinate of Tile to fetch
   * @returns {Tile} The tile at the provided coordinates
   */
  getTile(q, r) {
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
   * Returns the Tiles that are adjacent to the Tile at the provided (q, r) coordinates.
   * @example
   * let neighborsOfOrigin = myGrid.neighborsOf(0, 0);
   * neighborsOfOrigin.forEach((tile) => {
   *   tile.set("bordersOrigin", true);
   * });
   * @param {number} q - q coordinate of Tile for which to fetch neighbors
   * @param {number} r - r coordinate of Tile for which to fetch neighbors
   * @returns {Array.Tile} The array of neighboring Tiles
   */
  neighborsOf(q, r) {
    return HexGrid._axialUnitDirections.map(([qd, rd]) => {
      try {
        return this.getTile(q + qd, r + rd);
      } catch (e) {
        return null;
      }
    }).filter((tile) => {
      return tile !== null;
    });
  }

  /**
   * Calculates the distance between two (q, r) coordinates in tiles
   * @example
   * let myGrid = new HexGrid(2);
   * let distanceFromCenterToEdge = myGrid.distanceBetween(0, 0, 2, -2); // 2
   * @param {number} q1 - q coordinate of first tile
   * @param {number} r1 - r coordinate of first tile
   * @param {number} q2 - q coordinate of second tile
   * @param {number} r2 - r coordinate of second tile
   * @returns {number} The distance between the provided coordinates in tiles
   */
  distanceBetween(q1, r1, q2, r2) {
    let x1, y1, z1, x2, y2, z2;
    ({x: x1, y: y1, z: z1} = HexGrid._axialToCubic(q1, r1));
    ({x: x2, y: y2, z: z2} = HexGrid._axialToCubic(q2, r2));
    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
  }
}

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
