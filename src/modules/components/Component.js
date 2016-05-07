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
   * fields that will not be included in the output. This function will be
   * called recursively for nested component instances.
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
        let member = this[key];
        // Drill down into nested component instances recursively
        if (member instanceof Component) {
          output.data[key] = JSON.parse(member.serialize(blacklist));
        } else {
          output.data[key] = member;
        }
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
 * calling serialize() on that component. Also restores nested components.
 * @example
 * const coord = new Coord(5, 6);
 * const restored = Component.restore(coord.serialize());
 * coord.x === restored.x; // true
 * coord.y === restored.y; // true
 * @param {string} json - component's JSON string
 * @returns {Component} the restored Component object as it existed at
 * its time of serialization
 */
Component.restore = (json) => {
  const { ctor, data } = JSON.parse(json);
  const Ctor = Component._constructors[ctor];
  let component = new Ctor();
  Object.keys(data).forEach((key) => {
    let member = data[key];
    // Restore nested components. This is admittedly a bit of a "hack".
    // Basically, if it looks like a serialzed component, and it is contained
    // in the registered constructors map, try to restore it as a Component
    // instance.
    if (member.hasOwnProperty("ctor") &&
        member.hasOwnProperty("data") &&
        Component._constructors.hasOwnProperty(member.ctor)) {
      component[key] = Component.restore(JSON.stringify(member));
    } else {
      component[key] = data[key];
    }
  });
  return component;
};

export default Component;
