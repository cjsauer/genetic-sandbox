import Point from "./Point";

/**
 * An abstract class representing 2D geometric shapes that have a center, a width,
 * and a height
 * @abstract
 */
class Shape {
  /**
   * Creates a new shape at given point
   * Shape should be extended and its members overridden by a concrete subclass.
   * @example
   * class Circle extends Shape {
   *   constructor(point, radius) {
   *     super(point);
   *     this.r = radius;
   *   }
   *   get width() { return this.radius * 2; }
   *   get height() { return this.width; }
   * }
   * @param {Point} [center=new Point(0, 0)] - center point of shape
   */
  constructor(center) {
    /* Prevent instantiation */
    if (this.constructor === Shape) {
      throw new TypeError("Cannot construct Shape instances directly");
    }

    /**
     * The center position of this shape
     * @type Point
     */
    this.center = center || new Point(0, 0);
  }

  /**
   * The width of the bounding box containing this shape
   * @abstract
   * @returns {number} The width of the bounding box containing this shape
   */
  get width() {
    throw new Error("Shape#width must be implemented by subclass");
  }

  /**
   * The height of the bounding box containing this shape
   * @abstract
   * @returns {number} The height of the bounding box containing this shape
   */
  get height() {
    throw new Error("Shape#height must be implemented by subclass");
  }
}

export default Shape;
