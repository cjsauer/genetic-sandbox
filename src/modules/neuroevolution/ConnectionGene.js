import Serializable from "../util/Serializable";

/**
 * Genetic representation of a connection between two neurons in a neural
 * network
 * @extends Serializable
 * @see {NodeGene}
 */
class ConnectionGene extends Serializable {
  /**
   * Constructs a new ConnectionGene
   * @example
   * const node1 = new NodeGene(1, "input");
   * const node2 = new NodeGene(2, "output");
   * const conn = new ConnectionGene(node1.id, node2.id, 0.2, true);
   * @param {number} inID - id of the source node
   * @param {number} outID - id of the destination node
   * @param {number} weight - the weight of the connection as a value between
   * 0 and 1 inclusive
   * @param {boolean} enabled - whether this gene is expressed or not
   */
  constructor(inID, outID, weight, enabled) {
    super("connectionGene");

    if (arguments.length === 0) return;

    /**
     * ID of the source node for this connection
     * @type {number}
     */
    this.in = inID;

    /**
     * ID of the destination node for this connection
     * @type {number}
     */
    this.out = outID;

    /**
     * The weight of this connection as a value between 0 and 1 inclusive
     * @type {number}
     */
    this.weight = weight;

    /**
     * True if this gene is expressed, false otherwise. A connection gene
     * that is not expressed is given a weight of zero in the resulting
     * neural network.
     * @type {boolean}
     */
    this.enabled = enabled;

    const getInnovationNumber = () => {
      let key = this.in + "," + this.out;
      let map = ConnectionGene._innovationMap;
      if (!map.hasOwnProperty(key)) {
        map[key] = ConnectionGene._nextInnovationNumber++;
      }
      return map[key];
    };

    /**
    * ID of the historical origin, or "innovation number" of this connection
    * gene
    * @type {number}
    */
    this.innovationNumber = getInnovationNumber();
  }

  /**
   * Clones this connection gene, copying all of its current fields verbatim
   * @returns {ConnectionGene} the cloned connection gene
   */
  clone() {
    const gene = new ConnectionGene();
    gene.in = this.in;
    gene.out = this.out;
    gene.weight = this.weight;
    gene.enabled = this.enabled;
    gene.innovationNumber = this.innovationNumber;
    return gene;
  }

  /**
  * Resets the innovation history
  */
  static resetInnovations () {
    ConnectionGene._innovationMap = {};
    ConnectionGene._nextInnovationNumber = 1;
  }
}

/**
 * The global innovation number that is incremented each time a brand new
 * connection gene mutation occurs
 * @private
 * @type {number}
 */
ConnectionGene._nextInnovationNumber = 1;

/**
 * A map that stores historic connection gene mutations
 * @private
 * @type {Object}
 */
ConnectionGene._innovationMap = {};

Serializable.register(ConnectionGene);

export default ConnectionGene;
