/**
 * An abstract class modeling a generic grid of [Tiles]{@link Tile} that 
 * makes up the "playing surface" in Genetic Sandbox.
 * @summary Grid cannot be instantiated directly, but instead serves as an
 * interface for implementing new types of grids (hexagonal, cartesian, etc).
 * Subclasses of Grid will have to implement their own method for storing Tiles,
 * which will ultimately define the grid's coordinate system. For example, a 2D,
 * cartesian grid could be implemented using a two dimensional array of Tiles,
 * and then the below methods (e.g. getTile()) would be overridden to 
 * take (x,y) as arguments.
 * @abstract
 * @see {@link Tile}
 * @see HexGrid
 */
class Grid {
  /**
   * Grid can not be instantiated directly, but instead should be extended
   * by a concrete grid implementation.
   * @example
   * class SimpleGrid extends Grid {
   *   constructor() {
   *     super();
   *     this.tiles = [0, 1, 2, 3, 4, 5];
   *   }
   *
   *   getTile(i) {
   *     return this.tiles[i];
   *   }
   *
   *   neighborsOf(i) {
   *     return [
   *       this.tiles[(i - 1) % this.tiles.length],
   *       this.tiles[(i + 1) % this.tiles.length]
   *     ];
   *   }
   *
   *   distanceBetween(i1, i2) {
   *     return Math.abs(i1 - i2);
   *   }
   * }
   */
  constructor() {
    if (this.constructor === Grid) {
      throw new TypeError("Cannot construct Grid instances directly");
    }
  }

  /**
   * Returns the Tile at the provided coordinates.
   * @abstract
   * @returns {Tile} The tile at the provided coordinates
   */
  getTile(/* coordinates */) {
    throw new Error("Grid#getTile must be implemented by subclass");
  }

  /**
   * Returns an array of all tiles in the Grid
   * @abstract
   * @returns {Array.Tile} Array of all tiles in this Grid
   */
  getTiles() {
    throw new Error("Grid#getTiles must be implemented by subclass");
  }

  /**
   * Returns the Tiles that are adjacent to the Tile at the provided coordinates.
   * @abstract
   * @returns {Array.Tile} The array of neighboring Tiles
   */
  neighborsOf(/* coordinates */) {
    throw new Error("Grid#neighborsOf must be implemented by subclass");
  }

  /**
   * Calculates the distance between two grid coordinates in tiles
   * @abstract
   * @returns {number} The distance between the provided coordinates in tiles
   */
  distanceBetween(/* coordinate1, coordinate2 */) {
    throw new Error("Grid#distanceBetween must be implemented by subclass");
  }
}

export default Grid;
