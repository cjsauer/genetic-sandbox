/**
 * A toggleable plugin containing an array of [Systems]{@link System} and
 * configuration options
 */
class Plugin {
  /**
   * Constructs a new plugin
   * @example
   * import MySystem from "./systems/MySystem";
   * import MyOtherSystem from "./systems/MyOtherSystem";
   * const systems = [ new MySystem(), new MyOtherSystem() ];
   * const config = { someSetting: 10 };
   * const myPlugin = new Plugin("mine", systems, config);
   *
   * // Assuming myPlugin is registered in `config.js`, in some other file
   * // we can do:
   * import config from "../config";
   * config.mine.someSetting = 12; // someSetting has been exposed via config global
   * @param {string} name - name of the plugin
   * @param {System[]} systems - the systems that this plugin includes
   * @param {Object} config - configuration options that this plugin exposes
   * @param {boolean} [enabled=true] - whether this plugin is enabled or not
   */
  constructor(name, systems, config, enabled = true) {
    /**
     * Name of the plugin
     * @type {string}
     */
    this.name = name;

    /**
     * The array of systems that this plugin includes
     * @type {System[]}
     */
    this.systems = systems;

    /**
     * The configuration options that this plugin exposes
     * @type {Object}
     */
    this.config = config;

    /**
     * True if this plugin is enabled, false otherwise. A disabled plugin
     * will be excluded from the processing loop.
     * @type {boolean}
     */
    this.enabled = enabled;
  }
}

export default Plugin;
