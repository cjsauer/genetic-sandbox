import PlantGenerator from "./PlantGenerator";
import RegrowthProcessor from "./RegrowthProcessor";

const systems = [
  new PlantGenerator(),
  new RegrowthProcessor()
];

export default systems;
