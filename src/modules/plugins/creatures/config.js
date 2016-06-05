/**
 * Creature configuration options
 * @type {Object}
 */
const creatures = {
  /**
   * The chance that each tile has of spawning an initial creature
   * @type {number}
   */
  creatureRate: 0.02,

  /**
   * The amount of energy every creature starts with
   * @type {number}
   */
  initialEnergy: 20,

  /**
   * The amount of energy expended to move one tile
   * @type {number}
   */
  moveCost: 1,

  /**
   * The amount of energy expended per tick regardless of action taken
   * @type {number}
   */
  tickCost: 1
};

export default creatures;
