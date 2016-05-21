import Plugin from "../Plugin";
import BackgroundRenderer from "./systems/BackgroundRenderer";
import GridRenderer from "./systems/GridRenderer";

const systems = [
  new BackgroundRenderer(),
  new GridRenderer()
];

/**
 * Core configuration options
 * @type {Object}
 */
const core = {
  /**
  * The radius in hexagons of the world
  * @type {number}
  */
  gridRadius: 25,

  /**
  * The radius in pixels of a hexagon within the grid
  * @type {number}
  */
  hexRadius: 12
};

export default new Plugin("core", systems, core);
