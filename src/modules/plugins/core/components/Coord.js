import Component from "../../../ecs/Component";
import VectorMixin from "../../../util/VectorMixin";

/**
 * A two dimensional coordinate of x and y
 * @extends Component
 * @mixes VectorMixin
 */
class Coord extends VectorMixin(Component) {

  /**
   * Constructs a new Coord with coordinates (x,y)
   * @example
   * let myCoord = new Coord(-5, 10);
   * @param {number} [x=0] - x value
   * @param {number} [y=0] - y value
   */
  constructor(x = 0, y = 0) {
    super("coord");
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

Component.register(Coord);

export default Coord;
