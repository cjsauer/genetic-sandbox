import System from "../../System";
import DNA from "../../core/components/genetics/DNA";
import Brain from "../../core/components/Brain";
import Creature from "../components/Creature";
import config from "../../../config";

/**
 * Generates initial creatures with random DNA
 * @extends System
 * @see {@link Creature}
 */
class CreatureGenerator extends System {
  /**
   * Constructs a new CreatureGenerator
   */
  constructor() {
    super("generator");
  }

   /**
    * Seeds the world with creatures
    * @param {App} app - the currently running GS app
    */
  initialize(app) {
    const random = app.random;
    const tiles = app.grid.getTiles();
    tiles.forEach((tile) => {
      if (random.bool(config.creatures.creatureRate)) {
        let dna = new DNA(Brain.inputNeuronCount, Brain.outputNeuronCount, random);
        tile.set("creature", new Creature(dna, config.creatures.initialEnergy));
      }
    });
  }
}

export default CreatureGenerator;
