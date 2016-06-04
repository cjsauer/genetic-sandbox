import Component from "../../../ecs/Component";
import Brain from "../../core/components/Brain";
import Sequencer from "../../../genetics/Sequencer";

/**
 * Intelligent organism with the capability to evolve
 * @extends Component
 */
class Creature extends Component {
  /**
   * Constructs a new creature
   * @example
   * const dna = new DNA(3, 4, random);
   * const creature = new Creature(dna, 12);
   * creature.energy === 12; // true
   * @param {DNA} dna - the genetic representaiton of a creature
   * @param {number} energy - initial energy level
   */
  constructor(dna, energy) {
    super("creature");

    if (arguments.length === 0) return;

    /**
     * Energy level of this creature. When this reaches zero the creature,
     * is dead.
     * @type {number}
     */
    this.energy = energy;

    /**
     * The genetic representaiton of this creature
     * @type {DNA}
     */
    this.dna = dna;

    /**
     * The brain of this creature
     * @type {Brain}
     */
    this.brain = new Brain(dna, new Sequencer());
  }

  /**
   * True if this creature is alive, false otherwise
   * @type {boolean}
   */
  get alive() {
    return this.energy > 0;
  }

  /**
   * Eats the given plant, raising the creature's energy level by the amount
   * stored in the plant. Does NOT affect the plant in any way.
   * @param {Plant} plant - plant to eat
   * @returns {number} the creature's new energy level
   */
  eat(plant) {
    return (this.energy += plant.energy);
  }

  /**
   * Expends the given amount of energy. If the creature's energy drops below
   * zero, it dies.
   * @param {number} expenditure - the amount of energy to expend
   * @returns {boolean} True if the creature is still alive, false otherwise
   */
  expend(expenditure) {
    this.energy -= expenditure;
    if (!this.alive) {
      this.die();
      return false;
    }
    return true;
  }

  /**
   * Kills this creature
   */
  die() {
    this.energy = 0;
  }
}

Component.register(Creature);

export default Creature;
