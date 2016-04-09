/**
 * An abstract class modeling a generic grid of [Tiles]{@link Tile} that
 * makes up the "playing surface" in Genetic Sandbox.
 * @summary Serves as an interface for implementing new types of grids
 * (hexagonal, cartesian, etc).  Subclasses of IGrid will have to implement
 * their own method for storing Tiles, which will ultimately define the grid's
 * coordinate system. For example, a 2D, cartesian grid could be implemented
 * using a two dimensional array of Tiles, and then the below methods (e.g.
 * getTile()) would be overridden to take (x,y) as arguments.
 * @abstract
 * @see {@link Tile}
 * @see HexGrid
 */
class IGrid {
  /**
   * IGrid should be extended by a concrete grid implementation.
   * @example
   * class SimpleGrid extends IGrid {
   *   constructor() {
   *     super();
   *     this._tiles = [0, 1, 2, 3, 4, 5];
   *   }
   *
   *   getTile(i) {
   *     return this._tiles[i];
   *   }
   *
   *   neighborsOf(i) {
   *     return [
   *       this._tiles[(i - 1) % this._tiles.length],
   *       this._tiles[(i + 1) % this._tiles.length]
   *     ];
   *   }
   *
   *   distanceBetween(i1, i2) {
   *     return Math.abs(i1 - i2);
   *   }
   * }
   */
  constructor() {
    if (this.constructor === IGrid) {
      throw new TypeError("Cannot construct IGrid instances directly");
    }
  }

  /**
   * Returns the Tile at the provided coordinates.
   * @abstract
   * @returns {Tile} The tile at the provided coordinates
   */
  getTile(/* coordinates */) {
    throw new Error("IGrid#getTile must be implemented by subclass");
  }

  /**
   * Returns an array of all tiles in the grid
   * @abstract
   * @returns {Array.Tile} Array of all tiles in this grid
   */
  getTiles() {
    throw new Error("IGrid#getTiles must be implemented by subclass");
  }

  /**
   * Returns the Tiles that are adjacent to the Tile at the provided coordinates.
   * @abstract
   * @returns {Array.Tile} The array of neighboring Tiles
   */
  neighborsOf(/* coordinates */) {
    throw new Error("IGrid#neighborsOf must be implemented by subclass");
  }

  /**
   * Calculates the distance between two grid coordinates in tiles
   * @abstract
   * @returns {number} The distance between the provided coordinates in tiles
   */
  distanceBetween(/* coordinate1, coordinate2 */) {
    throw new Error("IGrid#distanceBetween must be implemented by subclass");
  }
}

export default IGrid;
