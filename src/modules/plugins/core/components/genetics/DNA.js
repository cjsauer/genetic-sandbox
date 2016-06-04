import Component from "../../../../ecs/Component";
import Strand from "./Strand";

/**
 * Genetic encoding of a creature heavily inspired by the
 * [NEAT algorithm]{@link http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf}
 * @extends Component
 */
class DNA extends Component {
  /**
   * Constructs the DNA for a brand new creature with base traits and the
   * simplest possible brain: one with only one enabled connection between
   * a random input neuron and a random output neuron.
   * @example
   * // Creates DNA for a creature with the current count of reserved input and
   * // output neurons
   * const myDNA = new DNA(Brain.inputNeuronCount, Brain.outputNeuronCount, random);
   * @param {number} inputCount - the total number of possible inputs (senses)
   * to a creature's brain
   * @param {number} outputCount - the total number of possible outputs (actions)
   * from a creature's brain
   * @param {Object} random - an instance of a random-js engine
   */
  constructor(inputCount, outputCount, random) {
    super("dna");

    if (arguments.length === 0) return;

    /**
     * Strand of genes describing a creature's brain
     * @type {Strand}
     */
    this.brainStrand = new Strand(inputCount, outputCount, true, random);

    // Randomly enable a single connection
    random.pick(this.brainStrand.connectionGenes).enabled = true;

    /**
     * Strand of genes describing the trait function (TF)
     * @type {Strand}
     */
    this.traitStrand = new Strand(1, 1, true, random);

    /**
     * Hox genes, or values fed into the trait function (TF) to produce usable
     * trait values
     * @private
     * @type {number[]}
     */
    this._hoxGenes = [ random.real(0, 1, true) ];
  }
}

Component.register(DNA);

export default DNA;
