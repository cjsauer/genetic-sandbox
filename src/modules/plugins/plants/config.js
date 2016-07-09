/**
 * Plant configuration options
 * @type {Object}
 */
const plants = {
  /**
   * The percentage of the grid that will be covered in vegetation
   * @type {number}
   */
  vegetationRate: 0.35,

  /**
   * Energy contained in a plant
   * @type {number}
   */
  plantEnergy: 12,

  /**
   * The chance that every plant has of seeding a neighboring tile
   * @type {number}
   */
  regrowthRate: 0.0001
};

export default plants;
