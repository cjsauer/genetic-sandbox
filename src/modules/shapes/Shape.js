import Point from "./Point";

/**
 * An abstract class representing 2D geometric shapes that have a center, a width,
 * and a height.
 * @abstract
 */
class Shape {
  /**
   * Creates a new shape at position (x, y).
   * Shapes cannot be instantiated directly. Instead, Shape should be extended
   * and its members overridden by a concrete subclass.
   *
   * @example
   * class Circle extends Shape {
   *   constructor(x, y, radius) {
   *     super(x, y);
   *     this.r = radius;
   *   }
   *   get width() { return this.radius * 2; }
   *   get height() { return this.width; }
   * }
   * @param {number} [x=0] - The x position of the center of this shape
   * @param {number} [y=0] - The y position of the center of this shape
   */
  constructor(x = 0, y = 0) {
    /* Prevent instantiation */
    if (this.constructor === Shape) {
      throw new TypeError("Cannot construct Shape instances directly");
    }

    /**
     * The center position of this shape
     * @type Point
     */
    this.center = new Point(x, y);
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
