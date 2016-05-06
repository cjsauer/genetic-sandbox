/**
 * Components are objects stored inside of [Tiles]{@link Tile} that contain
 * arbitrary data, be it plant data, creature data, tile coordinates, etc.
 * @see {@link Tile}
 */
class Component {
  /**
   * Component isn't instantiable directly, but should be extended by a
   * concrete subclass.
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
   * coord.serialize() // '{"ctor":"Coord","data":{"x":1,"y":2}}'
   * coord.serialize(["y"]) // '{"ctor":"Coord","data":{"x":1}}'
   * @param {string[]} [blacklist = []] - keys in this list will be excluded
   * from the JSON string
   * @returns {string} JSON string
   */
  serialize(blacklist = []) {
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
 * A hashmap of constructor functions currently registered
 * @type {Object}
 * @private
 */
Component._constructors = {};

/**
 * Registers the given constructor so that it can later be properly restored
 * from JSON using Component.restore()
 * @param {Function} ctor - constructor function for a subclass of Component
 */
Component.register = (ctor) => {
  Component._constructors[ctor.name] = ctor;
};

/**
 * Restores a component object from its JSON string, obtained by originally
 * calling serialize() on that component
 * @param {string} json - component's JSON string
 * @returns {Component} the restored Component object as it existed at
 * its time of serialization
 */
Component.restore = (json) => {
  const { ctor, data } = JSON.parse(json);
  const Ctor = Component._constructors[ctor];
  let component = new Ctor();
  Object.keys(data).forEach((key) => {
    component[key] = data[key];
  });
  return component;
};

export default Component;
