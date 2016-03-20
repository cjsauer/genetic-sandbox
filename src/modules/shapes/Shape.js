/**
 * An abstract class representing geometric shapes that have a center, a width,
 * and a height. Dimensions like width and height describe the shape's bounding
 * box.
 * @class Shape
 */
class Shape {
  /**
   * Shapes cannot be instantiated directly. Instead, Shape should be extended
   * and its members overridden by a concrete subclass.
   *
   * @example
   * class Circle extends Shape {
   *   constructor(x, y, radius) {
   *     super();
   *     this.x = x;
   *     this.y = y;
   *     this.r = radius;
   *   }
   *   get width() { return this.radius * 2; }
   *   get height() { return this.width; }
   *   get center() { return { x: this.x, y: this.y }; }
   * }
   */
  constructor() {
    if (this.constructor === Shape) {
      throw new TypeError("Cannot construct Shape instances directly");
    }
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

  /**
   * The position of the center of this shape
   * @abstract
   * @returns {Object} center - The position of the center of this shape
   * @returns {number} center.x - The x value of this shape's center
   * @returns {number} center.y - The y value of this shape's center
   */
  get center() {
    throw new Error("Shape#center must be implemented by subclass");
  }
}

export default Shape;
