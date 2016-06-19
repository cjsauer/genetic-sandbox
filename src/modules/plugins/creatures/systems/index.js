import CreatureGenerator from "./CreatureGenerator";
import TouchProcessor from "./TouchProcessor";
import BrainProcessor from "./BrainProcessor";
import MovementProcessor from "./MovementProcessor";
import EatingProcessor from "./EatingProcessor";
import AgingProcessor from "./AgingProcessor";

const systems = [
  new CreatureGenerator(),
  new TouchProcessor(),
  new BrainProcessor(),
  new MovementProcessor(),
  new EatingProcessor(),
  new AgingProcessor()
];

export default systems;
