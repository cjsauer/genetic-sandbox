import IShape from "./IShape";
import Point from "./Point";

/**
 * A flat-topped, regular hexagon. Implementation details can be found
 * [here]{@link http://www.redblobgames.com/grids/hexagons/}.
 * @extends IShape
 */
class Hexagon extends IShape {
  /**
   * Creates a new Hexagon with center at point and a given radius
   * @example
   * let hex = new Hexagon(new Point(0, 0), 100);
   * @param {Point} center - center position of Hexagon
   * @param {number} radius - distance from the center to the corners
   */
  constructor(center, radius) {
    super(center);

    /**
     * Distance from the center to the corners
     * @type number
     */
    this.radius = radius;
  }

  /**
   * Returns the position as a Point of the *ith* corner.
   * There are six corners on a hexagon (0-5) which are indexed in clockwise
   * order starting from the right-most.
   * @param {number} i - Index of the corner for which to calculate the position.
   * @returns {Point} Position of ith corner
   */
  cornerAt(i) {
    /* The unit circle moves counter-clockwise, we want clockwise, hence the negative sign. */
    const angleDeg = -60 * i;
    const angleRad = Math.PI / 180 * angleDeg;
    return new Point(this.center.x + this.radius * Math.cos(angleRad),
                     this.center.y + this.radius * Math.sin(angleRad));
  }

  /**
   * The width of the bounding box of the hexagon
   * @example
   * let w = hex.width;
   * @returns {number} The width of the bounding box of the hexagon
   */
  get width() {
    return this.radius * 2;
  }

  /**
   * The height of the bounding box of the hexagon
   * @example
   * let h = hex.height;
   * @returns {number} The height of the bounding box of the hexagon
   */
  get height() {
    return Math.sqrt(3) / 2 * this.width;
  }
}

export default Hexagon;
