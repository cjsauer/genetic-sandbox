import Component from "../../../ecs/Component";

/**
 * Intelligent organism with the capability to evolve
 * @extends Component
 */
class Creature extends Component {
  /**
   * Constructs a new creature component
   */
  constructor(dna) {
    super("creature");

    /**
     * Total number of plants this creature has eaten
     * @type {number}
     */
    this.plantsEaten = 0;

    /**
     * Total number of moves this creature has made
     * @type {number}
     */
    this.movesMade = 0;
  }
}

Component.register(Creature);

export default Creature;
