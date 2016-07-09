import _ from "lodash";

/**
 * Collection of node genes
 */
class NodeGeneCollection {
  /**
   * Constructs a new, empty node gene collection
   */
  constructor() {
    /**
     * Array of node genes currently in this collection
     * @type {NodeGene[]}
     */
    this.genes = [];

    /**
     * Private map of node gene id to node gene
     * @private
     * @type {Object}
     */
    this._genes = {};
  }

  /**
   * Adds the given node gene to the collection
   * @param {NodeGene} gene - the node gene to add
   */
  addGene(gene) {
    this.genes.push(gene);
    this._genes[gene.id] = gene;
  }

  /**
   * Removes the node gene with the given ID from the collection, or does
   * nothing if that node gene is not in this collection
   * @param {number} id - id of the node gene to remove
   */
  removeGene(id) {
    if (this.contains(id)) {
      _.remove(this.genes, (gene) => gene.id === id);
      delete this._genes[id];
    }
  }

  /**
   * Returns true if this collection contains a node gene with the given id,
   * false otherwise
   * @param {number} id - the id of the node gene to test for
   * @returns {boolean} - true if the collection contains a node gene with the
   * given id, false otherwise
   */
  contains(id) {
    return this._genes[id] !== undefined;
  }

  /**
   * Retrieves the node gene with the given id from this collection, or null
   * if that node does not exist
   * @param {number} id - the id of the node gene to retrieve
   * @returns {NodeGene} - the fetched node gene, or null if that node gene
   * does not exist in this collection
   */
  getGene(id) {
    if (this.contains(id)) return this._genes[id];
    else return null;
  }

  /**
   * Number of node genes currently in this collection
   * @returns {number} number of node genes currently in this collection
   */
  get length() {
    return this.genes.length;
  }

  /**
   * Returns the count of input node genes currently in this collection
   * @returns {number} input node gene count
   */
  get inputNodeGeneCount() {
    const isInputNodeGene = (gene) => gene.type === "input";
    return this.genes.filter(isInputNodeGene).length;
  }

  /**
   * Returns the count of output node genes currently in this collection
   * @returns {number} output node gene count
   */
  get outputNodeGeneCount() {
    const isOutputNodeGene = (gene) => gene.type === "output";
    return this.genes.filter(isOutputNodeGene).length;
  }

  /**
   * Returns the count of hidden node genes currently in this collection
   * @returns {number} hidden node gene count
   */
  get hiddenNodeGeneCount() {
    const isHiddenNodeGene = (gene) => gene.type === "hidden";
    return this.genes.filter(isHiddenNodeGene).length;
  }
}

export default NodeGeneCollection;
