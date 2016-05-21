import Plugin from "../Plugin";
import CreatureGenerator from "./systems/CreatureGenerator";
import CreatureRenderer from "./systems/CreatureRenderer";

const systems = [
  new CreatureGenerator(),
  new CreatureRenderer()
];

/**
 * Creature configuration options
 * @type {Object}
 */
const creatures = {
  /**
   * The chance that each tile has of spawning an initial creature
   * @type {number}
   */
  creatureRate: 0.01
};

export default new Plugin("creatures", systems, creatures);
