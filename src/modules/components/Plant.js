import Component from "./Component";

/**
 * An edible plant containing energy
 */
class Plant extends Component {
  /**
   * Creates a new plant with the given energy amount
   * @param {number} [energy = 0] - initial energy stored in this plant
   */
  constructor(energy = 0) {
    super();

    /**
     * Energy stored in this plant
     * @type number
     * @default 0
     */
    this.energy = energy;
  }
}

export default Plant;
