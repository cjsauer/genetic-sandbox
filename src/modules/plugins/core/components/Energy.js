import Component from "../../../ecs/Component";

/**
 * Energy is the currency of existence
 * @extends Component
 */
class Energy extends Component {
  /**
   * Constructs a new energy component with the given energy level
   * @param {number} energyLevel - level of energy to initiate this component
   * with
   */
  constructor(energyLevel) {
    super("energy");

    /**
     * Amount of energy
     * @private
     * @type {number}
     */
    this._level = energyLevel;
  }

  /**
   * The current energy level
   * @returns {number} current energy level
   */
  get level() {
    return this._level;
  }

  /**
   * Increases the current energy level by the given amount
   * @param {number} amount - amount of energy to gain
   * @param {number} the updated energy level
   */
  gain(amount) {
    return (this._level += amount);
  }

  /**
   * Expends the given amount of energy, capped at zero
   * @param {number} amount - amount of energy to expend
   * @returns {number} the updated energy level
   */
  expend(amount) {
    if ((this._level -= amount) < 0) {
      this._level = 0;
    }

    return this.level;
  }
}

Component.register(Energy);

export default Energy;
