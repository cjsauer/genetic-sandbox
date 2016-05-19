import Component from "./Component";

/**
 * A neural network that receives sense input from the environment and produces
 * actions on the behalf of a creature
 * @extends Component
 */
class Brain extends Component {
  /**
   * Constructs a new brain resulting from reading the given {@link DNA} with
   * the supplied {@link Sequencer}
   * @param {DNA} dna - creature DNA
   * @param {Sequencer} sequencer - the sequencer to use to read the brain
   * strand from the DNA
   */
  constructor(dna, sequencer) {
    super();

    if (arguments.length === 0) return;

    /**
     * The internal neural network used for processing senses
     * @private
     * @type {Network}
     */
    this._net = sequencer.read(dna.brainStrand);

    /**
     * The optimized function equivalent of the internal neural network
     * @private
     * @type {Function}
     */
    this._activate = this._net.standalone();

    /**
     * Input values waiting to be activated by the brain
     * @private
     * @type {number[]}
     */
    this._inputs = new Array(Brain._inputNeuronCount);

    /**
     * The outputs produced by activating the brain
     * @private
     * @type {number[]}
     */
    this._outputs = new Array(Brain._outputNeuronCOunt);
  }

  /**
   * Inputs the given sense value to the specified neuron
   * @example
   * // Called in the ISystem#reserve() method
   * const mySenseID = Brain.reserveInput();
   * // ...
   * myBrain.input(mySenseID, 0.5);
   * @param {number} id - id of neuron
   * @param {number} value - value to input between 0 and 1 inclusive
   */
  input(id, value) {
    this._inputs[id] = value;
  }

  /**
   * Fetches the output value of the given neuron
   * @example
   * // Called in the ISystem#reserve() method
   * const myOutputID = Brain.reserveOutput();
   * // ...
   * const outputValue = myBrain.output(myOutputID);
   * @param {number} id - id of neuron
   */
  output(id) {
    return this._outputs[id];
  }

  /**
   * Activates the brain on the inputs entered thus far
   */
  activate() {
    this._outputs = this._activate(this._inputs);
  }
}

/**
* The number of input neurons that every creature's brain will be initialized
* with
* @private
* @type {number}
*/
Brain._inputNeuronCount = Brain._inputNeuronCount || 0;

/**
 * Reserves a single input neuron. This function is expected to be called only
 * once in the reservation step by systems that will be feeding sense data into
 * the brain.
 * @example
 * const senseID = Brain.reserveInput();
 * @returns {number} the ID of the reserved input neuron
 */
Brain.reserveInput = () => {
  return Brain._inputNeuronCount++;
};

/**
* The number of output neurons that every creature's brain will be initialized
* with
* @private
* @type {number}
*/
Brain._outputNeuronCount = Brain._outputNeuronCount || 0;

/**
 * Reserves a single output neuron. This function is expected to be called only
 * once in the reservation step by systems that will be feeding sense data into
 * the brain.
 * @example
 * const actionID = Brain.reserveOutput();
 * @returns {number} the ID of the reserved output neuron
 */
Brain.reserveOutput = () => {
  return Brain._outputNeuronCount++;
};

Component.register(Brain);

export default Brain;
