/**
 * An abstract class modeling a generic 2D grid of [Tiles]{@link Tile}.
 * A subclass of IGrid is ultimately responsible for both storing and accessing
 * tiles.
 * @abstract
 * @see {@link Tile}
 * @see {@link HexGrid}
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
   * @param {number} x - First dimension of tile coordinate
   * @param {number} y - Second dimension of tile coordinate
   * @returns {Tile} The tile at the provided coordinates
   */
  getTile(x, y) {
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
   * @param {number} x - First dimension of tile coordinate
   * @param {number} y - Second dimension of tile coordinate
   * @returns {Array.Tile} The array of neighboring Tiles
   */
  neighborsOf(x, y) {
    throw new Error("IGrid#neighborsOf must be implemented by subclass");
  }

  /**
   * Calculates the distance between two grid coordinates in tiles
   * @abstract
   * @param {number} x1 - First dimension of first tile coordinate
   * @param {number} y1 - Second dimension of first tile coordinate
   * @param {number} x2 - First dimension of second tile coordinate
   * @param {number} y2 - Second dimension of second tile coordinate
   * @returns {number} The distance between the provided coordinates in tiles
   */
  distanceBetween(x1, y1, x2, y2) {
    throw new Error("IGrid#distanceBetween must be implemented by subclass");
  }
}

export default IGrid;
