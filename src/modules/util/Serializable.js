/**
 * An interface for recursively serializing and deserializing objects to and from
 * JSON.
 */
class Serializable {
  /**
   * Serializable isn't instantiable directly, but should be extended by a
   * concrete subclass.
   */
  constructor() {
    /* Prevent instantiation */
    if (this.constructor === Serializable) {
      throw new TypeError("Cannot construct Serializable instances directly");
    }
  }

  /**
   * Serializes this object to JSON with an optional array of blacklisted
   * fields that will not be included in the output. This function will be
   * called recursively for nested Serializable objects.
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
      if (!blacklist.includes(key) && !key.startsWith("!")) {
        let member = this[key];
        // Drill down into nested objects recursively
        if (member instanceof Serializable) {
          output.data[key] = JSON.parse(member.serialize(blacklist));
        } else {
          output.data[key] = member;
        }
      }
    });

    return JSON.stringify(output);
  }

  /**
  * Registers the given constructor so that it can later be properly restored
  * from JSON using Serializable.restore()
  * @param {Function} ctor - constructor function for a subclass of Serializable
  */
  static register(ctor) {
    Serializable._constructors[ctor.name] = ctor;
  }

  /**
  * Restores a Serializable object from its JSON string, obtained by originally
  * calling serialize() on that object. Also restores nested Serializable
  * objects..
  * @example
  * const coord = new Coord(5, 6);
  * const restored = Serializable.restore(coord.serialize());
  * coord.x === restored.x; // true
  * coord.y === restored.y; // true
  * @param {string} json - object's JSON string
  * @returns {Serializable} the restored Serializable object as it existed at
  * its time of serialization
  */
  static restore(json) {
    const { ctor, data } = JSON.parse(json);
    const Ctor = Serializable._constructors[ctor];
    let object = new Ctor();
    Object.keys(data).forEach((key) => {
      let member = data[key];
      // Restore nested Serializable objects. This is admittedly a bit of a "hack".
      // Basically, if it looks like a serialzed object, and it is contained
      // in the registered constructors map, try to restore it as a Serializable
      // instance.
      if (member.hasOwnProperty("ctor") &&
      member.hasOwnProperty("data") &&
      Serializable._constructors.hasOwnProperty(member.ctor)) {
        object[key] = Serializable.restore(JSON.stringify(member));
      } else {
        object[key] = data[key];
      }
    });
    return object;
  }
}

/**
 * A hashmap of constructor functions currently registered
 * @type {Object}
 * @private
 */
Serializable._constructors = {};

export default Serializable;
