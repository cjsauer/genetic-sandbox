/**
 * Components are objects stored inside of [Tiles]{@link Tile} that contain
 * arbitrary data, be it plant data, creature data, tile coordinates, etc.
 * @see Tile
 */
class Component {
  /**
   * Component isn't instantiable directly, but should be extended and its
   * methods overridden by a concrete subclass.
   */
  constructor() {
    /* Prevent instantiation */
    if (this.constructor === Component) {
      throw new TypeError("Cannot construct Component instances directly");
    }
  }

  /**
   * Serializes this component to JSON with an optional array of blacklisted
   * fields that will not be included in the output
   * @example
   * let coord = new Coord(1, 2);
   * coord.serialize() // { ctor: "Coord", data: { x: 1, y: 2}}
   * coord.serialize(["y"]) // { ctor: "Coord", data: { x: 1 }}
   * @param {string[]} [blacklist] - keys in this list will be excluded
   * from the JSON string
   * @returns {string} JSON string
   */
  serialize(blacklist) {
    blacklist = blacklist || [];

    let output = {
      ctor: this.constructor.name,
      data: {}
    };

    Object.keys(this).forEach((key) => {
      if (!blacklist.includes(key)) {
        output.data[key] = this[key];
      }
    });

    return JSON.stringify(output);
  }
}

/**
 * Restores a component object from its constructor and data, both of which can
 * be pulled from the JSON string resulting from previously calling serialize()
 * on the component.
 * @private
 * @param {Object} Ctor - the constructor that will be used to instantiate
 * the component
 * @param {Object} data - the fields for this component gathered from the JSON
 * string by previously calling serialize()
 * @returns {Component} the restored Component object as it existed at
 * its time of serialization
 */
Component.restore = (Ctor, data) => {
  let component = new Ctor();
  Object.keys(data).forEach((key) => {
    component[key] = data[key];
  });
  return component;
};

export default Component;
