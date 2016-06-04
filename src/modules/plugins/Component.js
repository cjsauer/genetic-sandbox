import Serializable from "../util/Serializable";

/**
 * Components are bags of properties that entities possess. It is possible for
 * Components to contain other nested Components. They may also contain helper
 * methods.
 */
class Component extends Serializable {
  /**
   * Component isn't instantiable directly, but should be extended by a
   * concrete subclass.
   * @param {string} name - the name of the component
   */
  constructor(name) {
    super();

    /**
     * Name of the component. Expected to be unique among Components.
     * @type {string}
     */
    this.name = name;

    /* Prevent instantiation */
    if (this.constructor === Component) {
      throw new TypeError("Cannot construct Component instances directly");
    }
  }
}

export default Component;
