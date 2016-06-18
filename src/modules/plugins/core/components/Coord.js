import Component from "../../../ecs/Component";

/**
 * A two dimensional coordinate of x and y
 * @extends Component
 */
class Coord extends Component {

  /**
   * Constructs a new Coord with coordinates (x,y)
   * @example
   * let myCoord = new Coord(-5, 10);
   * myCoord.x = 0;
   * myCoord.y = 0;
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

  /**
   * Determines if the give coordinate is equal to this one
   * @param {Coord} coord - the coordinate to compare to
   * @returns {boolean} True if this coordinate is equal to the given one, false
   * otherwise
   */
  equalTo(coord) {
    return (this.x === coord.x) && (this.y === coord.y);
  }
}

Component.register(Coord);

export default Coord;
