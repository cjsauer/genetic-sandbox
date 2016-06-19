/**
 * Two dimensional vector
 * @mixin
 */
function VectorMixin(Base) {
  return class extends Base {
    /**
     * Determines if the given vector is equal to this one
     * @memberof VectorMixin.prototype
     * @param {VectorMixin} vec - the vector to compare to
     * @returns {boolean} True if this vector is equal to the given one, false
     * otherwise
     */
    equalTo(vec) {
      return (this.x === vec.x) && (this.y === vec.y);
    }

    /**
     * Sets the (x, y) coordinates of this vector
     * @memberof VectorMixin.prototype
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     * @returns {Base} this vector
     */
    set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }

    /**
     * Adds the given vector to this one, producing a new vector sum. It returns
     * an instance with the same type as the `this` argument. So for example,
     * if adding a Coord to a Velocity as below, it would return a Coord instance.
     * @memberof VectorMixin.prototype
     * @example
     * const coord = new Coord(1, 2);
     * const velocity = new Velocity(3, 4);
     * let sum = coord.add(velocity); // Coord instance
     * sum = velocity.add(coord); // Velocity instance
     * @param {VectorMixin} vec - the other vector to add
     * @returns {Base} the vector sum
     */
    add(vec) {
      return new this.constructor(this.x + vec.x, this.y + vec.y);
    }
  };
};

export default VectorMixin;
