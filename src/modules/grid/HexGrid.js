import { buildTile } from "../plugins/core/assembly";
import Coord from "../plugins/core/components/Coord";
import Point from "../shapes/Point";

/**
 * A 2D, hexagonal grid implementation with axial coordinate system.
 * Implementation details can be found [here]{@link http://goo.gl/nLO6sN}.
 * @see {@link Coord}
 */
class HexGrid {
  /**
   * Constructs a new HexGrid of given radius. The pattern of tiles within the
   * grid will then form a hexagon itself with (0,0) being the center.
   * A grid of radius 0 is just a single hexagon, radius 1 is a single hexagon
   * surrounded by 1 layer of hexagons, and so on...
   * @example
   * let myGrid = new HexGrid(10);
   * @param {number} radius - Number of tiles from center of grid to the edge,
   * not counting the center tile
   */
  constructor(radius) {
    /**
     * The radius of this hex grid in tiles
     * @type {number}
     */
    this.radius = radius;
  }

  /**
   * Builds an array of tile entities that represent this hex grid
   * @returns {Entity[]} array of tile entities
   */
  buildTiles() {
    /* Generate a hex grid. We'll use the constraint in cubic coordinates
     * that x + y + z = 0 to decide where hexes are to be placed before
     * converting to axial coordinates for creation of the Coord component.
     * Note that within this file (x, y, z) refer to cubic coordinates, while
     * (q, r) refer to axial coordinates. The distinction is only present
     * within this file for clarity; everywhere else in the source will use
     * (x, y) notation in favor of familiarity.
     */
    let tiles = [];
    let radius = this.radius;
    let x, y, z, q, r;
    for (x = -radius; x <= radius; x++) {
      for (y = -radius; y <= radius; y++) {
        for (z = -radius; z <= radius; z++) {
          if ((x + y + z) === 0) {
            // This is a valid hex. Instantiate and store in the tiles array.
            ({q, r} = HexGrid._cubicToAxial(x, y, z));
            tiles.push(buildTile(new Coord(q, r)));
          }
        }
      }
    }

    return tiles;
  }

  /**
   * Returns the Coords that are adjacent to the given Coord
   * @example
   * let neighborsOfOrigin = myGrid.neighborsOf(new Coord(0, 0));
   * @param {Coord} coord - coordinates of tile for which to calculate neighbors
   * @returns {Coord[]} The array of neighboring Coords
   */
  neighborsOf({ x: q, y: r }) {
    return HexGrid._axialUnitDirections.map(([qd, rd]) => {
      return new Coord(q + qd, r + rd);
    });
  }

  /**
   * Calculates the distance between two Coords in tiles
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

  /**
  * Converts a tile's coordinates to its pixel coordinates
  * @param {Coord} coord - tile coordinates
  * @param {number} radius - radius of hexagons (for correct spacing)
  * @returns {Point} pixel coordinates of center of tile
  */
  coordToPixel (coord, radius) {
    let { x: q, y: r } = coord;
    return new Point(
      radius * Math.sqrt(3) * (r + (q / 2)),
      radius * (3 / 2) * q
    );
  }

  /**
   * Internal helper function for converting from axial coordinates to cubic
   * @private
   */
  static _axialToCubic(q, r) {
    return {
      x: q,
      z: r,
      y: -q - r
    };
  }

  /**
   * Internal helper function for converting from cubic coordinates to axial
   * @private
   */
  static _cubicToAxial (x, y, z) {
    return {
      q: x,
      r: z
    };
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

export default HexGrid;
