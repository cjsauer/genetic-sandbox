import Component from "../Component";
import NodeGene from "./NodeGene";
import ConnectionGene from "./ConnectionGene";

/**
 * Genetic representation of a neural network
 * @extends Component
 * @see {NodeGene}
 * @see {ConnectionGene}
 */
class Strand extends Component {
  /**
   * Constructs a new Strand representing a fully connected neural network with
   * the given number of input/output neurons, zero hidden neurons, and
   * random weight values
   * @example
   * // Represents a neural network with 4 input neurons, 5 output neurons,
   * // and all connection genes enabled.
   * const strand1 = new Strand(4, 5, true, random);
   * // Represents a neural network with 2 input neurons, 4 output neurons,
   * // and all connection genes disabled.
   * const strand2 = new Strand(2, 4, false, random);
   * @param {number} inputCount - number of input neuron genes
   * @param {number} outputCount - number of output neuron genes
   * @param {boolean} enabled - whether all connection genes are initially
   * enabled (true), or disabled (false)
   * @param {Object} random - an instance of a random-js instance
   */
  constructor(inputCount, outputCount, enabled, random) {
    super();

    if (arguments.length === 0) return;

    /**
     * The list of node genes describing neurons
     * @type {NodeGene[]}
     */
    this.nodeGenes = [];

    /**
     * The list of connection genes describing connections between neurons
     * @type {ConnectionGene[]}
     */
    this.connectionGenes = [];

    /**
     * The ID to use for the next node gene
     * @private
     * @type {number}
     */
    this._nextNodeGeneID = 1;

    let inputNodeGenes = [];
    let outputNodeGenes = [];
    let connectionGenes = [];

    // Create the input node genes
    for (let i = 0; i < inputCount; i++) {
      inputNodeGenes.push(new NodeGene(this._nextNodeGeneID++, "input"));
    }

    // Create the output node genes
    for (let i = 0; i < outputCount; i++) {
      outputNodeGenes.push(new NodeGene(this._nextNodeGeneID++, "output"));
    }

    // Create a connection gene for every input/output combination
    inputNodeGenes.forEach((inputNodeGene) => {
      outputNodeGenes.forEach((outputNodeGene) => {
        let weight = random.real(0, 1, true);
        let connGene = new ConnectionGene(inputNodeGene.id, outputNodeGene.id, weight, enabled);
        connectionGenes.push(connGene);
      });
    });

    this.nodeGenes = inputNodeGenes.concat(outputNodeGenes);
    this.connectionGenes = connectionGenes;
  }
}

Component.register(Strand);

export default Strand;
