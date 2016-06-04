import Component from "../../Component";

/**
 * An edible plant containing energy
 * @extends Component
 */
class Plant extends Component {
  /**
   * Creates a new plant with the given energy amount
   * @param {number} [energy = 0] - initial energy stored in this plant
   */
  constructor(energy = 0) {
    super("plant");

    /**
     * Energy stored in this plant
     * @type number
     * @default 0
     */
    this.energy = energy;
  }
}

Component.register(Plant);

export default Plant;
