import Component from "../../../../ecs/Component";

/**
 * Genetic representation of a neuron in a neural network
 * @extends Component
 */
class NodeGene extends Component {
  /**
   * Constructs a new NodeGene
   * @example
   * const node1 = new NodeGene(1, "input");
   * const node2 = new NodeGene(2, "output");
   * const node3 = new NodeGene(3, "hidden");
   * @param {number} [id=0] - the id of the neuron
   * @param {string} [type=hidden] - one of "input", "hidden", or "output"
   */
  constructor(id = 0, type = "hidden") {
    super("nodeGene");

    /**
     * The id of the neuron
     * @type {number}
     */
    this.id = id;

    /**
     * Type of neuron. One of "input", "hidden", or "output".
     * @type {string}
     */
    this.type = type;
  }
}

Component.register(NodeGene);

export default NodeGene;
