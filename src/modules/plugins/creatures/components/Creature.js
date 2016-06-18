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
  }
}

Component.register(Creature);

export default Creature;
