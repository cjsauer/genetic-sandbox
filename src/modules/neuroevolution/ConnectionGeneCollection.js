import _ from "lodash";

/**
 * Collection of connection genes
 */
class ConnectionGeneCollection {
  /**
   * Constructs a new, empty connection gene collection
   */
  constructor() {
    /**
     * Array of connection genes currently in this collection
     * @type {NodeGene[]}
     */
    this.genes = [];

    /**
     * Private map of connection gene innovation number to connection gene
     * @private
     * @type {Object}
     */
    this._genes = {};
  }

  /**
   * Adds the given connection gene to the collection
   * @param {NodeGene} gene - the connection gene to add
   */
  addGene(gene) {
    this.genes.push(gene);
    this._genes[gene.innovationNumber] = gene;
  }

  /**
   * Removes the connection gene with the given innovation number from the
   * collection, or does nothing if that connection gene is not in this
   * collection
   * @param {number} innovationNumber - innovation number of the connection gene
   * to remove
   */
  removeGene(innovationNumber) {
    if (this.contains(innovationNumber)) {
      _.remove(this.genes, (gene) => gene.innovationNumber === innovationNumber);
      delete this._genes[innovationNumber];
    }
  }

  /**
   * Returns true if this collection contains a connection gene with the given
   * innovation number, false otherwise
   * @param {number} innovationNumber - the innovation number of the connection
   * gene to test for
   * @returns {boolean} - true if the collection contains a connection gene with
   * the given innovation number, false otherwise
   */
  contains(innovationNumber) {
    return this._genes[innovationNumber] !== undefined;
  }

  /**
   * Retrieves the connection gene with the given innovation number from this
   * collection, or null if that connection gene does not exist
   * @param {number} innovationNumber - the innovation number of the connection
   * gene to retrieve
   * @returns {NodeGene} - the fetched connection gene, or null if that
   * connection gene does not exist in this collection
   */
  getGene(innovationNumber) {
    if (this.contains(innovationNumber)) return this._genes[innovationNumber];
    else return null;
  }

  /**
   * Number of connection genes currently in this collection
   * @returns {number} number of connection genes currently in this collection
   */
  get length() {
    return this.genes.length;
  }
}

export default ConnectionGeneCollection;
