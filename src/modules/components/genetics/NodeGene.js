import Component from "../Component";

/**
 * Genetic representation of a neuron in a neural network
 * @extends Component
 */
class NodeGene extends Component {
  /**
   * Constructs a new NodeGene
   * @param {number} id - the id of the neuron
   * @param {string} type - one of "input", "hidden", or "output"
   */
  constructor(id, type) {
    super();

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

export default NodeGene;
