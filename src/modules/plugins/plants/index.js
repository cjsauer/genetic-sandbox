import Plugin from "../Plugin";
import PlantGenerator from "./systems/PlantGenerator";
import PlantRenderer from "./systems/PlantRenderer";

const systems = [
  new PlantGenerator(),
  new PlantRenderer()
];

/**
 * Plant configuration options
 * @type {Object}
 */
const plants = {
  /**
   * The percentage of the grid that will be covered in vegetation
   * @type {number}
   */
  vegetationRate: 0.1
};

export default new Plugin("plants", systems, plants);
