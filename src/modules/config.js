import core from "./plugins/core";
import plants from "./plugins/plants";

/* Here is where you can add your plugin! */
export const plugins = [
  core,
  plants
];

/**
 * An aggregation of all plugin configuration options, and the main interface
 * for tweaking them.
 * @example
 * import config from "../config";
 * // Change the vegetation rate
 * config.plants.vegetationRate = 0.2;
 * // Change the size of the world
 * config.core.gridRadius = 35;
 * @type {Object}
 */
const config = {};

plugins.forEach((plugin) => {
  config[plugin.name] = plugin.config;
});

export default config;
