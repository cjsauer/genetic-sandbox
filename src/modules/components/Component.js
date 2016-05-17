import Serializable from "../util/Serializable";

/**
 * Components are objects stored inside of [Tiles]{@link Tile} that contain
 * arbitrary data, be it plant data, creature data, tile coordinates, etc.
 * @see {@link Tile}
 */
class Component extends Serializable {
  /**
   * Component isn't instantiable directly, but should be extended by a
   * concrete subclass.
   */
  constructor() {
    super();
    /* Prevent instantiation */
    if (this.constructor === Component) {
      throw new TypeError("Cannot construct Component instances directly");
    }
  }
}

export default Component;
