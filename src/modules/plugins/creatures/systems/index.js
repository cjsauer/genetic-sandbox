import CreatureGenerator from "./CreatureGenerator";
import CreatureRenderer from "./CreatureRenderer";
import TouchProcessor from "./TouchProcessor";
import BrainProcessor from "./BrainProcessor";
import MovementProcessor from "./MovementProcessor";
import EatingProcessor from "./EatingProcessor";
import AgingProcessor from "./AgingProcessor";

const systems = [
  new CreatureGenerator(),
  new CreatureRenderer(),
  new TouchProcessor(),
  new BrainProcessor(),
  new MovementProcessor(),
  new EatingProcessor(),
  new AgingProcessor()
];

export default systems;
