import Component from "../Component";

/**
 * Genetic representation of a connection between two neurons in a neural
 * network
 * @extends Component
 * @see {NodeGene}
 */
class ConnectionGene extends Component {
  /**
   * Constructs a new ConnectionGene
   * @param {number} inID - id of the source node
   * @param {number} outID - id of the destination node
   * @param {number} weight - the weight of the connection as a value between
   * 0 and 1 inclusive
   * @param {boolean} enabled - whether this gene is expressed or not
   */
  constructor(inID, outID, weight, enabled) {
    super();
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
     * True if this gene is expressed, false otherwise
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

}

/**
 * The global innovation number that is incremented each time a brand new
 * connection gene mutation occurs
 * @private
 * @type {number}
 */
ConnectionGene._nextInnovationNumber = ConnectionGene._nextInnovationNumber || 1;

/**
 * A map that stores historic connection gene mutations
 * @private
 * @type {Object}
 */
ConnectionGene._innovationMap = ConnectionGene._innovationMap || {};

/**
 * Resets the innovation history
 */
ConnectionGene.resetInnovations = () => {
  ConnectionGene._innovationMap = {};
  // ConnectionGene._nextInnovationNumber = 0;
};

Component.register(ConnectionGene);

export default ConnectionGene;
