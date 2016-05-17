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
   * Constructs a new Strand representing a neural network with the given number
   * of input/output neurons and random weight values
   * @param {number} inputCount - number of input neuron genes
   * @param {number} outputCount - number of output neuron genes
   * @param {boolean} enabled - whether all connection genes are initially
   * enabled, or disabled
   * @param {Object} random - an instance of a random-js instance
   */
  constructor(inputCount, outputCount, enabled, random) {
    super();

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

    /**
     * The ID to use for the next node gene
     * @private
     * @type {number}
     */
    this._nextConnectionGeneID = 1;

    if (inputCount === undefined || outputCount === undefined) {
      return;
    }

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
