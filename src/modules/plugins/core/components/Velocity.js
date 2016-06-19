import Component from "../../../ecs/Component";
import VectorMixin from "../../../util/VectorMixin";

/**
 * A two dimensional velocity
 * @extends Component
 * @mixes VectorMixin
 */
class Velocity extends VectorMixin(Component) {

  /**
   * Constructs a new Velocity component
   * @example
   * let myVelocity = new Velocity(-5, 10);
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
}

Component.register(Velocity);

export default Velocity;
