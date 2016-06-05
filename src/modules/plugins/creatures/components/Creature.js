import Component from "../../../ecs/Component";

/**
 * Intelligent organism with the capability to evolve
 * @extends Component
 */
class Creature extends Component {
  /**
   * Constructs a new creature component with the given DNA
   * @example
   * const dna = new DNA(3, 4, random);
   * const creature = new Creature(dna);
   * @param {DNA} dna - the genetic representaiton of a creature
   */
  constructor(dna) {
    super("creature");

    if (arguments.length === 0) return;

    /**
     * The genetic representaiton of this creature
     * @type {DNA}
     */
    this.dna = dna;
  }
}

Component.register(Creature);

export default Creature;
