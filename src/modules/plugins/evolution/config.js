/**
 * Evolution configuration options
 * @type {Object}
 */
const evolution = {
  /**
   * The chance that each tile has of spawning an initial creature
   * @type {number}
   */
  plantsEatenCoefficient: 1.0,

  moveCoefficient: 1.0,
  maxSpecies: 8,
  compatibilityThreshold: 2.0,
  mutateWeightChance: 0.8,
  perturbAmplitude: 0.05,
  addNodeChance: 0.3,
  addConnectionChance: 0.5
};

export default evolution;
