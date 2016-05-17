import Component from "../Component";
import Strand from "./Strand";

/**
 * Genetic encoding of a creature heavily inspired by the
 * [NEAT algorithm]{@link http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf}
 * @extends Component
 */
class DNA extends Component {
  /**
   * Constructs the DNA for a brand new creature with base traits and the
   * simplest possible brain, meaning one with zero hidden neurons, and a
   * single randomly selected input to output connection
   * @param {number} inputCount - the number of possible inputs (senses) to a
   * creature's brain
   * @param {number} outputCount - the number of possible outputs (actions)
   * from a creature's brain
   * @param {Object} random - an instance of a random-js engine
   */
  constructor(inputCount, outputCount, random) {
    super();

    /**
     * Strand of genes describing a creature's brain
     * @type {Strand}
     */
    this.brainStrand = new Strand(inputCount, outputCount, false, random);

    // Randomly enable a single connection
    random.pick(this.brainStrand.connectionGenes).enabled = true;

    /**
     * Strand of genes describing the trait function (TF)
     * @type {Strand}
     */
    this.traitStrand = new Strand(1, 1, true, random);

    /**
    * Values fed into the trait function (TF) to produce usable trait values
    * @typedef {number} HoxGene
    */

    /**
     * Hox genes
     * @type {HoxGene[]}
     */
    this.hoxGenes = [ random.real(0, 1, true) ];
  }
}

Component.register(DNA);

export default DNA;
