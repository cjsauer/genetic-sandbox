import Entity from "../../ecs/Entity";
import Creature from "./components/Creature";
import Brain from "./components/Brain";
import DNA from "./components/DNA";
import Coord from "../core/components/Coord";
import Energy from "../core/components/Energy";
import Sprite from "../core/components/Sprite";
import Velocity from "../core/components/Velocity";
import Sequencer from "../../neuroevolution/Sequencer";
import config from "../../config";

/**
 * Builds a creature entity with the given DNA at the given position
 * @param {DNA} dna - genetic representation of the creature
 * @param {Coord} coord - coordinate to place the creature entity at
 * @returns {Entity} the built creature entity
 */
export function buildCreature(dna, coord) {
  const entity = new Entity();
  entity.addComponent(new Creature());
  entity.addComponent(dna);
  entity.addComponent(new Brain(dna, new Sequencer()));
  entity.addComponent(new Energy(config.creatures.initialEnergy));
  entity.addComponent(new Sprite("creature"));
  entity.addComponent(new Velocity());
  entity.addComponent(new Coord(coord.x, coord.y));
  return entity;
};

/**
 * Builds a creature entity with the default initial DNA at the given position
 * @param {Coord} coord - coordinate to place the creature entity at
 * @param {Object} random - an instance of a random-js engine
 * @returns {Entity} the built creature entity
 */
export function buildDefaultCreature(coord, random) {
  const entity = new Entity();
  const dna = new DNA(Brain.inputNeuronCount, Brain.outputNeuronCount, random);
  entity.addComponent(new Creature());
  entity.addComponent(dna);
  entity.addComponent(new Brain(dna, new Sequencer()));
  entity.addComponent(new Energy(config.creatures.initialEnergy));
  entity.addComponent(new Sprite("creature"));
  entity.addComponent(new Velocity());
  entity.addComponent(new Coord(coord.x, coord.y));
  return entity;
}
