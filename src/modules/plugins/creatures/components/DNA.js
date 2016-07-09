import Component from "../../../ecs/Component";
import Strand from "../../../neuroevolution/Strand";

/**
 * Genetic encoding of a creature heavily inspired by the
 * [NEAT algorithm]{@link http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf}
 * @extends Component
 */
class DNA extends Component {
  /**
   * Constructs the DNA for a brand new creature with base traits and a brain
   * possessing the given number of input/output neurons
   * @example
   * // Creates DNA for a creature with the current count of reserved input and
   * // output neurons
   * const myDNA = new DNA(Brain.inputNeuronCount, Brain.outputNeuronCount, random);
   * @param {number} inputCount - the total number of possible inputs (senses)
   * to a creature's brain
   * @param {number} outputCount - the total number of possible outputs
   * (actions) from a creature's brain
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

  /**
   * Mutates this DNA's constituent strands
   * @param {number} mutateWeightChance - chance a strand has of mutating its weights
   * @param {number} addNodeChance - chance a strand has of adding a new node
   * gene
   * @param {number} addConnectionChance - chance a strand has of adding a new
   * connection between two unconnected nodes
   * @param {Object} random - random-js generator instance
   */
  mutate(mutateWeightChance, addNodeChance, addConnectionChance, random) {
    // TODO: replace these hardcoded values with configuration settings
    // Attempt to mutate the brain strand
    if (random.bool(mutateWeightChance)) this.brainStrand.mutateWeights(0.9, 0.1, 0.1, random);
    if (random.bool(addNodeChance)) this.brainStrand.addRandomNodeGene(random);
    if (random.bool(addConnectionChance)) this.brainStrand.addRandomConnectionGene(10, random);

    // Attempt to mutate the trait strand
    if (random.bool(mutateWeightChance)) this.traitStrand.mutateWeights(0.9, 0.1, 0.1, random);
    if (random.bool(addNodeChance)) this.traitStrand.addRandomNodeGene(random);
    if (random.bool(addConnectionChance)) this.traitStrand.addRandomConnectionGene(10, random);
  }

  /**
   * Computes the compatibility distance between this and the given DNA by
   * adding the compatibility distances of its constituent strands
   * @param {DNA} otherDNA - the DNA to compare this one against
   * @returns {number} the computed compatibility distance measure
   */
  compatibilityDistance(otherDNA) {
    // TODO: replace these hardcoded values with configuration settings
    let brainDistance = this.brainStrand.compatibilityDistance(otherDNA.brainStrand, 1.0, 1.0, 1.0);
    let traitDistance = this.traitStrand.compatibilityDistance(otherDNA.traitStrand, 1.0, 1.0, 1.0);
    return brainDistance + traitDistance;
  }

  /**
   * Clones this DNA, performing a deep copy of its constituent strands and
   * hox genes
   */
  clone() {
    const dna = new DNA();
    dna.brainStrand = this.brainStrand.clone();
    dna.traitStrand = this.traitStrand.clone();
    dna._hoxGenes = this._hoxGenes.slice(0);
    return dna;
  }
}

Component.register(DNA);

export default DNA;
