/**
 * A 2D point in space. Contains (x, y) coordinates.
 */
class Point {

  /**
   * Construct a new Point at coordinate (x,y)
   * @example
   * let myPoint = new Point(100, 200);
   * myPoint.x = 0;
   * myPoint.y = 0;
   * @param {number} [x=0] - The x coordinate
   * @param {number} [y=0] - The y coordinate
   */
  constructor(x = 0, y = 0) {
    /**
     * The x coordinate of this point
     * @type number
     * @default 0
     */
    this.x = x;

    /**
     * The y coordinate of this point
     * @type number
     * @default 0
     */
    this.y = y;
  }
}

export default Point;
