import _ from "lodash";
import Serializable from "../util/Serializable";
import NodeGene from "./NodeGene";
import ConnectionGene from "./ConnectionGene";
import NodeGeneCollection from "./NodeGeneCollection";
import ConnectionGeneCollection from "./ConnectionGeneCollection";

/**
 * Genetic representation of a neural network
 * @extends Serializable
 * @see {NodeGene}
 * @see {ConnectionGene}
 */
class Strand extends Serializable {
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
   * // Represents a completely empty strand (no nodes or connections)
   * const strand3 = new Strand();
   * @param {number} inputCount - number of input neuron genes
   * @param {number} outputCount - number of output neuron genes
   * @param {boolean} enabled - whether all connection genes are initially
   * enabled (true), or disabled (false)
   * @param {Object} random - an instance of a random-js instance
   */
  constructor(inputCount, outputCount, enabled, random) {
    super("strand");

    /**
     * Collection of node genes describing neurons
     * @type {NodeGeneCollection}
     */
    this.nodes = new NodeGeneCollection();

    /**
     * Collection of connection genes describing connections between neurons
     * @type {ConnectionGeneCollection}
     */
    this.connections = new ConnectionGeneCollection();

    if (arguments.length === 0) return;

    let inputNodeGenes = [];
    let outputNodeGenes = [];

    // Create the input node genes
    for (let i = 0; i < inputCount; i++) {
      let gene = new NodeGene(this._nextNodeGeneID(), "input");
      inputNodeGenes.push(gene);
      this.nodes.addGene(gene);
    }

    // Create the output node genes
    for (let i = 0; i < outputCount; i++) {
      let gene = new NodeGene(this._nextNodeGeneID(), "output");
      outputNodeGenes.push(gene);
      this.nodes.addGene(gene);
    }

    // Create a connection gene for every input/output combination
    inputNodeGenes.forEach((inputNodeGene) => {
      outputNodeGenes.forEach((outputNodeGene) => {
        let weight = random.real(0, 1, true);
        let connGene = new ConnectionGene(inputNodeGene.id, outputNodeGene.id, weight, enabled);
        this.connections.addGene(connGene);
      });
    });
  }

  /**
   * The highest node gene id currently in this strand plus one
   * @private
   * @returns {number} the id to use for the next node gene
   */
  _nextNodeGeneID() {
    if (this.nodes.length === 0) return 1;
    else {
      return _.maxBy(this.nodes.genes, (gene) => gene.id).id + 1;
    }
  }

  /**
   * Randomly perturbs this strand's connection gene weights, possibly
   * replacing the weight with a new value completely. Chances are NOT
   * codependent.
   * @param {number} perturbChance - chance that each weight has of being mutated
   * @param {number} perturbAmplitude - maximum change in weight possible
   * @param {number} newValueChance - chance that a weight will be completely
   * replaced by a new value
   * @param {Object} random - random-js generator instance
   */
  mutateWeights(perturbChance, perturbAmplitude, newValueChance, random) {
    this.connections.genes.forEach((gene) => {
      if (random.bool(perturbChance)) {
        let delta = perturbAmplitude * random.real(0, 1) * (random.bool(0.5) ? 1 : -1);
        gene.weight += delta;
      }

      if (random.bool(newValueChance)) {
        gene.weight = random.real(0, 1);
      }
    });
  }

  /**
   * Splits the given connection gene with a new node gene. The original
   * connection is disabled and two new connection genes are added to the
   * strand. The new connection leading into the new node receives a weight of
   * 1, and the new connection leading out of the new node receives the same
   * weight as the original connection.
   * @private
   * @param {ConnectionGene} connectionGene - connection gene to split
   */
  _splitConnectionWithNode(connectionGene) {
    const nodeGene = new NodeGene(this._nextNodeGeneID(), "hidden");
    const incomingConnection = new ConnectionGene(connectionGene.in, nodeGene.id, 1, true);
    const outgoingConnection = new ConnectionGene(nodeGene.id, connectionGene.out, connectionGene.weight, true);
    connectionGene.enabled = false;
    this.nodes.addGene(nodeGene);
    this.connections.addGene(incomingConnection);
    this.connections.addGene(outgoingConnection);
  }

  /**
   * Chooses a connection gene at random and splits it with a new node gene
   * @param {Object} random - random-js generator instance
   */
  addRandomNodeGene(random) {
    const connectionToSplit = random.pick(this.connections.genes);
    this._splitConnectionWithNode(connectionToSplit);
  }

  /**
   * Determines if two node genes are connected
   * @private
   * @param {number} sourceNodeID - ID of source node of the potential
   * connection
   * @param {number} destNodeID - ID of destination node of the potential
   * connection
   * @returns {boolean} true if the two node gene IDs are already connected,
   * false otherwise
   */
  _areConnected(sourceNodeID, destNodeID) {
    return this.connections.genes.some((gene) => {
      return (gene.in === sourceNodeID && gene.out === destNodeID);
    });
  }

  /**
   * Determines if two node genes are capable of being connected
   * @private
   * @param {number} sourceNodeID - ID of the source node of the potential connection
   * @param {number} destNodeID - ID of the destination node of the potential
   * connection
   * @returns {boolean} true if the given node gene IDs are able to connect,
   * false otherwise
   */
  _canConnect(sourceNodeID, destNodeID) {
    let sourceNode = this.nodes.getGene(sourceNodeID);
    let destNode = this.nodes.getGene(destNodeID);
    return sourceNode.type !== "output" &&
           destNode.type !== "input" &&
           !this._areConnected(sourceNodeID, destNodeID);
  }

  /**
   * Connects the two given node genes with a new connection gene
   * @private
   * @param {number} sourceNodeID - ID of the source node of the new connection
   * @param {number} destNodeID - ID of the destination node of the new
   * connection
   * @param {ConnectionGene} the new connection gene, or null if that connection
   * is not valid
   */
  _connect(sourceNodeID, destNodeID, random) {
    let connectionGene = null;
    if (this._canConnect(sourceNodeID, destNodeID)) {
      connectionGene = new ConnectionGene(sourceNodeID, destNodeID, random.real(0, 1), true);
      this.connections.addGene(connectionGene);
    }
    return connectionGene;
  }

  /**
   * Attempts to add a random connection gene to the genome, failing after
   * the given number of iterations
   * @param {number} iterations - number of times to randomly try selecting two
   * node genes to connect
   * @param {Object} random - random-js generator instance
   * @returns {ConnectionGene} the added connection gene, or null if no gene could
   * be added
   */
  addRandomConnectionGene(iterations, random) {
    let connectionGene = null;
    for (let attempts = 0; attempts < iterations; attempts++) {
      // Randomly select two nodes...
      let sourceNode = random.pick(this.nodes.genes);
      let destNode = random.pick(this.nodes.genes);

      // ...and attempt to connect them
      connectionGene = this._connect(sourceNode.id, destNode.id, random);
      if (connectionGene !== null) break;
    }
    return connectionGene;
  }

  /**
   * Returns the matching connection genes between this and the given strand.
   * Connection genes are considered matching if they have the same innovation
   * number. Results are returned as an array of pairs, where this strand's
   * gene is at index 0 of the pair, and the other strand's gene is at index
   * 1 of the pair.
   * @private
   * @param {Strand} otherStrand - the strand to compare this one against
   * @returns {ConnectionGene[][]} array of pairs, where this strand's gene is
   * at index 0 of the pair, and the other strand's gene is at index 1 of the
   * pair
   */
  _matching(otherStrand) {
    let myGenes = this.connections.genes;
    let otherGenes = otherStrand.connections.genes;
    let myMatches = _.intersectionBy(myGenes, otherGenes, (gene) => gene.innovationNumber);
    let otherMatches = _.intersectionBy(otherGenes, myGenes, (gene) => gene.innovationNumber);
    return _.zip(myMatches, otherMatches);
  }

  /**
   * Returns the disjoint connection genes between this and the given strand,
   * where index 0 of the result is this strand's disjoint genes, and index 1 of
   * the result is the other strand's disjoint genes. Connection genes are
   * considered disjoint if they are not matching in the middle of the strands.
   * @private
   * @param {Strand} otherStrand - the strand to compare this one against
   * @returns {ConnectionGene[][]} array of disjoint connection genes, where
   * index 0 is this strand's disjoint genes, and index 1 is the other strand's
   * disjoint genes
   */
  _disjoint(otherStrand) {
    const result = [[], []];
    // Only consider non-matching genes
    let matching = _.flatten(this._matching(otherStrand));
    let myCandidates = _.without(this.connections.genes, ...matching);
    let otherCandidates = _.without(otherStrand.connections.genes, ...matching);

    // Test whether the given candidate has an innovation number that's less
    // than any gene's innovation number in the other strand
    myCandidates.forEach((candidate) => {
      if (otherCandidates.some((gene) => { return gene.innovationNumber > candidate.innovationNumber; })) {
        result[0].push(candidate);
      }
    });
    otherCandidates.forEach((candidate) => {
      if (myCandidates.some((gene) => { return gene.innovationNumber > candidate.innovationNumber; })) {
        result[1].push(candidate);
      }
    });
    return result;
  }

  /**
   * Returns the excess connection genes between this and the given strand,
   * where index 0 of the result is this strand's excess genes, and index 1 of
   * the result is the other strand's excess genes. Connection genes are
   * considered excess if they are not matching at the end of the strand.
   * @private
   * @param {Strand} otherStrand - the strand to compare this one against
   * @returns {ConnectionGene[][]} array of excess connection genes, where
   * index 0 is this strand's excess genes, and index 1 is the other strand's
   * excess genes
   */
  _excess(otherStrand) {
    const result = [[], []];
    // Only consider non-matching genes
    let matching = _.flatten(this._matching(otherStrand));
    let myCandidates = _.without(this.connections.genes, ...matching);
    let otherCandidates = _.without(otherStrand.connections.genes, ...matching);

    // Test whether the given candidate has an innovation number that's greater
    // than every gene's innovation number in the other strand
    myCandidates.forEach((candidate) => {
      if (otherCandidates.every((gene) => { return gene.innovationNumber < candidate.innovationNumber; })) {
        result[0].push(candidate);
      }
    });
    otherCandidates.forEach((candidate) => {
      if (myCandidates.every((gene) => { return gene.innovationNumber < candidate.innovationNumber; })) {
        result[1].push(candidate);
      }
    });
    return result;
  }

  /**
   * Crosses this strand over with the given one. Matching genes are inherited
   * randomly from both parents, whereas disjoint and excess genes are inherited
   * only from the more fit parent. The more fit parent is assumed to be `this`
   * strand unless the equalFitness flag is set to true. In that case ALL
   * disjoint and excess genes are inherited. Genes that are disabled in either
   * parent have the given chance of also being disabled in the offspring.
   * @param {Strand} otherStrand - the strand to crossover with this one
   * @param {number} disabledChance - the chance that a gene has of being
   * disabled if it is disabled in either parent
   * @param {boolean} equalFitness - if set to true, all excess and disjoint
   * genes are inherited from both parents, otherwise only the excess and
   * disjoint genes from `this` parent will be inherited
   * @param {Object} random - a random-js generator instance
   */
  crossover(otherStrand, disabledChance, equalFitness, random) {
    let offspring = new Strand(); // Create an empty strand to fill up

    // Randomly inherit matching genes
    let matchingGenes = this._matching(otherStrand);
    matchingGenes.forEach((pair) => {
      let geneToInherit = (random.bool(0.5) ? pair[0] : pair[1]).clone();
      geneToInherit.enabled = true;
      if ((!pair[0].enabled || !pair[1].enabled) && random.bool(disabledChance)) {
        geneToInherit.enabled = false;
      }
      offspring.connections.addGene(geneToInherit);
    });

    // Inherit either this parent's excess and disjoint genes, or both parents'
    // excess and disjoint genes if the equalFitness flag is set
    let excessGenes = this._excess(otherStrand);
    let disjointGenes = this._disjoint(otherStrand);
    let genesToInherit = [];
    genesToInherit = _.concat(genesToInherit, excessGenes[0], disjointGenes[0]);
    if (equalFitness) {
      genesToInherit = _.concat(genesToInherit, excessGenes[1], disjointGenes[1]);
    }
    genesToInherit.forEach((gene) => offspring.connections.addGene(gene));

    // Inherit all the necessary node genes
    let possibleNodeGenes = _.unionBy(this.nodes.genes, otherStrand.nodes.genes, (gene) => gene.id);
    possibleNodeGenes.filter((nodeGene) => {
      // Remove all node genes that aren't part of a connection
      return offspring.connections.genes.some((connGene) => {
        return connGene.in === nodeGene.id || connGene.out === nodeGene.id;
      });
    }).forEach((gene) => offspring.nodes.addGene(gene.clone()));

    return offspring;
  }

  /**
   * Computes the compatibility distance between two strands
   * @param {Strand} otherStrand - the strand to compare this one against
   * @param {number} excessCoefficient - the importance placed on the number
   * of excess genes in determining compatibility
   * @param {number} disjointCoefficient - the importance placed on the number
   * of disjoint genes in determining compatibility
   * @param {number} weightCoefficient - the importance placed on differences
   * in weights between matching connection genes in determining compatibility
   * @returns {number} the computed compatibility distance measure
   */
  compatibilityDistance(otherStrand, excessCoefficient, disjointCoefficient, weightCoefficient) {
    // Determine the number of genes in the larger genome, normalized to 1 if
    // both genomes are "small" (less than 20 genes)
    let myLength = this.connections.length;
    let otherLength = otherStrand.connections.length;
    let N = myLength >= otherLength ? myLength : otherLength;
    if (N < 20) N = 1;

    // Compute matching, disjoint, and excess gene counts
    let matchingGenes = this._matching(otherStrand);
    let totalDisjoints = _.flatten(this._disjoint(otherStrand)).length;
    let totalExcess = _.flatten(this._excess(otherStrand)).length;

    // Compute the average weight difference between matching genes
    let totalWeightDifference = 0;
    matchingGenes.forEach((pair) => {
      totalWeightDifference += Math.abs(pair[0].weight - pair[1].weight);
    });
    let averageWeightDifference = totalWeightDifference / matchingGenes.length;

    // Compute the final compatibility distance
    return (excessCoefficient * totalExcess / N) + (disjointCoefficient * totalDisjoints / N) + (weightCoefficient * averageWeightDifference);
  }

  /**
   * Makes a complete, deep copy of this strand
   * @returns {Strand} the cloned strand
   */
  clone() {
    let strand = new Strand();
    this.nodes.genes.forEach((gene) => {
      strand.nodes.addGene(new NodeGene(gene.id, gene.type));
    });
    this.connections.genes.forEach((gene) => {
      strand.connections.addGene(new ConnectionGene(gene.in, gene.out, gene.weight, gene.enabled));
    });
    return strand;
  }
}

Serializable.register(Strand);

export default Strand;
