import Component from "../../../ecs/Component";

/**
 * A two dimensional velocity
 * @extends Component
 */
class Velocity extends Component {

  /**
   * Constructs a new Velocity component
   * @example
   * let myVelocity = new Velocity(-5, 10);
   * myVelocity.x = 0;
   * myVelocity.y = 0;
   * @param {number} [x=0] - x value
   * @param {number} [y=0] - y value
   */
  constructor(x = 0, y = 0) {
    super("velocity");
    /**
     * x value
     * @type number
     * @default 0
     */
    this.x = x;

    /**
     * y value
     * @type number
     * @default 0
     */
    this.y = y;
  }

  /**
   * Determines if the give velocity is equal to this one
   * @param {Velocity} velocity - the velocity to compare to
   * @returns {boolean} True if this velocity is equal to the given one, false
   * otherwise
   */
  equalTo(velocity) {
    return (this.x === velocity.x) && (this.y === velocity.y);
  }
}

Component.register(Velocity);

export default Velocity;
