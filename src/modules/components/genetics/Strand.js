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

    if (inputCount === undefined || outputCount === undefined) {
      return;
    }

    let id = 1;
    let inputNodeGenes = [];
    let outputNodeGenes = [];
    let connectionGenes = [];

    // Create the input node genes
    for (let i = 0; i < inputCount; i++) {
      inputNodeGenes.push(new NodeGene(id, "input"));
    }

    // Create the output node genes
    for (let i = 0; i < outputCount; i++) {
      outputNodeGenes.push(new NodeGene(id, "output"));
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

export default Strand;
