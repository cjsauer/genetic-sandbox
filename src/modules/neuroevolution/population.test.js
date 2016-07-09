import Population from "./Population";
import Strand from "./Strand";
import Sequencer from "./Sequencer";
import Random from "random-js";
import { expect } from "chai";

describe.only("Population", () => {
  let random;

  before(() => {
    random = new Random(Random.engines.mt19937().autoSeed());
  });

  it("can be instantiated with zero arguments", () => {
    const population = new Population();
    expect(population).to.be.ok;
    expect(population.entities).to.have.lengthOf(0);
    expect(population._phenomeFunction(0)).to.equal(0); // Default phenome builder
  });

  describe("speciation", () => {
    const genomes = [ 0, 1, 2, 3, 4, 5 ];

    function buildPhenome(genome) {
      return genome; // Our genome and phenome are identical for this test
    }

    function compatibilityDistance(entity1, entity2) {
      return Math.abs(entity1.genome - entity2.genome);
    }

    function fitnessFunction(entity) {
      return entity.genome;
    }

    it("can chunk its entities up into groups based on compatibility", () => {
      const population = new Population(genomes, buildPhenome);
      const species = population.species;

      // Chunks the entities up into 2 species of 3 entities each
      population.speciate(2.5, compatibilityDistance);
      expect(species).to.have.lengthOf(2);
      expect(species[0].entities).to.have.lengthOf(3);
      expect(species[1].entities).to.have.lengthOf(3);

      // Chunks the entities up into 6 species of 1 entity each
      population.speciate(0.5, compatibilityDistance);
      expect(species).to.have.lengthOf(6);
      species.forEach((specie) => expect(specie.entities).to.have.lengthOf(1));

      // Compacts the entities back into a single species containing all 6
      // entities, with the other 5 species now being empty
      population.speciate(5.0, compatibilityDistance);
      expect(species).to.have.lengthOf(6);
      expect(species[0].entities).to.have.lengthOf(6);
      expect(species.filter((specie) => specie.entities.length === 0)).to.have.lengthOf(5);
    });

    it("can prune away extinct and stagnant species", () => {
      const population = new Population(genomes, buildPhenome);

      // Chunks the entities up into 6 species of 1 entity each
      population.speciate(0.5, compatibilityDistance);
      expect(population.species).to.have.lengthOf(6);

      // Compacts the entities back into a single species containing all 6
      // entities, with the other 5 species now being empty
      population.speciate(5.0, compatibilityDistance);
      expect(population.species).to.have.lengthOf(6);

      population.pruneSpecies(3, fitnessFunction);
      expect(population.species).to.have.lengthOf(1);
      population.pruneSpecies(3, fitnessFunction);
      expect(population.species).to.have.lengthOf(1);

      // Last species is never removed
      population.pruneSpecies(3, fitnessFunction);
      expect(population.species).to.have.lengthOf(1);
    });

    it("can compute the total average fitness of all species", () => {
      const population = new Population(genomes, buildPhenome);
      expect(population.totalAverageFitness(fitnessFunction)).to.equal(0);

      // Chunks the entities up into 6 species of 1 entity each
      population.speciate(0.5, compatibilityDistance);
      expect(population.totalAverageFitness(fitnessFunction)).to.equal(15);

      // Compacts the entities back into a single species containing all 6
      // entities, with the other 5 species now being empty
      population.speciate(5.0, compatibilityDistance);
      expect(population.totalAverageFitness(fitnessFunction)).to.equal(15 / 6);
    });

    it("can retrieve a list of champions from each species", () => {
      const population = new Population(genomes, buildPhenome);

      // Chunks the entities up into 6 species of 1 entity each
      population.speciate(0.5, compatibilityDistance);
      expect(population.champions(1, fitnessFunction).map((e) => e.genome)).to.eql([ 0, 1, 2, 3, 4, 5 ]);

      // Compacts the entities back into a single species containing all 6
      // entities, with the other 5 species now being empty
      population.speciate(5.0, compatibilityDistance);
      expect(population.champions(1, fitnessFunction).map((e) => e.genome)).to.eql([ 5 ]);
    });
  });

  it("can compute its maximum fitness score", () => {
    const genomes = [ 0, 1, 2, 3, 4, 5 ];
    function buildPhenome(genome) {
      return genome; // Our genome and phenome are identical for this test
    }
    function fitnessFunction(entity) {
      return entity.phenome; // Higher the number, higher the fitness
    }
    const population = new Population(genomes, buildPhenome);
    expect(population.maxFitness(fitnessFunction)).to.equal(5);
  });

  it("can retrieve the entity that currently has the highest fitness", () => {
    const genomes = [ 0, 1, 2, 3, 4, 5 ];
    function buildPhenome(genome) {
      return genome; // Our genome and phenome are identical for this test
    }
    function fitnessFunction(entity) {
      return entity.phenome; // Higher the number, higher the fitness
    }
    const population = new Population(genomes, buildPhenome);
    expect(population.bestEntity(fitnessFunction)).to.eql({
      genome: 5, phenome: 5
    });
  });

  /*
  * In order to test the Population module we are going to be evolving neural
  * networks that compute the function XOR. Although this task is simple,
  * it requires growing hidden neurons and so is a good test of the algorithm.
  * In this test, a Strand represents an entity's genome, and the neural network
  * built from that Strand using a Sequencer represents an entity's phenome.
  */
  it("can evolve an XOR network", () => {
    // Define the functions necessary for evolving the population
    function fitnessFunction(entity) {
      const network = entity.phenome;
      let test00 = network.activate([0, 0])[0];
      let test10 = 1 - network.activate([1, 0])[0];
      let test01 = 1 - network.activate([0, 1])[0];
      let test11 = network.activate([1, 1])[0];
      return Math.pow(4 - (test00 + test10 + test01 + test11), 2);
    }

    function compatibilityDistanceFunction(entity1, entity2) {
      const strand1 = entity1.genome;
      const strand2 = entity2.genome;
      let excessCoefficient = 1.0;
      let disjointCoefficient = 1.0;
      let weightCoefficient = 0.3;
      return strand1.compatibilityDistance(strand2, excessCoefficient, disjointCoefficient, weightCoefficient);
    }

    function mutateFunction(entity) {
      const strand = entity.genome;
      let mutateWeightsChance = 0.8;
      let perturbChance = 0.9;
      let perturbAmplitude = 1.0;
      let newValueChance = 0.1;
      let addNodeChance = 0.03;
      let addConnectionChance = 0.05;
      strand.mutate(mutateWeightsChance, perturbChance, perturbAmplitude, newValueChance, addNodeChance, addConnectionChance, random);
      return entity;
    }

    function crossoverFunction(entity1, entity2) {
      const strand1 = entity1.genome;
      const strand2 = entity2.genome;
      let disabledChance = 0.75;
      let equalFitness = fitnessFunction(entity1) === fitnessFunction(entity2);
      return strand1.crossover(strand2, disabledChance, equalFitness, random);
    }

    // Create our initial set of genomes
    const genomes = [];
    const populationSize = 150;
    for (let i = 0; i < populationSize; i++) {
      // The XOR function takes 2 inputs, and produces 1 output
      genomes.push(new Strand(2, 1, true, random));
    }

    // Create the initial population
    const sequencer = new Sequencer();
    let population = new Population(genomes, sequencer.read);
    expect(population).to.be.ok;
    expect(population.entities).to.have.lengthOf(populationSize);

    // Run the evolution until the networks are trained (or we reach the generation cap)
    let generations = 0;
    let generationCap = 15;
    let crossoverRate = 0.75;
    let compatibilityThreshold = 3.0;
    while ((population.maxFitness(fitnessFunction) < 16) && (generations++ < generationCap)) {
      population.evolve(
        compatibilityThreshold,
        crossoverRate,
        fitnessFunction,
        compatibilityDistanceFunction,
        mutateFunction,
        crossoverFunction,
        random
      );
      expect(population.maxFitness(fitnessFunction)).to.equal(fitnessFunction(population.bestEntity(fitnessFunction)));
      console.log("GEN " + generations);
      console.log("Current maximum fitness: " + population.maxFitness(fitnessFunction));
      console.log("Population size: " + population.entities.length);
      console.log("Species count: " + population.species.length);
      console.log(population.species.map((specie) => {
        return { count: specie.entities.length, max: specie._maxFitnessScore, stagnant: specie._stagnantPotential };
      }));
      console.log("Average nodes " + population.entities.map((e) => e.genome.nodes.length).reduce((prev, curr) => prev + curr, 0) / population.entities.length);
      console.log("Average connections " + population.entities.map((e) => e.genome.connections.length).reduce((prev, curr) => prev + curr, 0) / population.entities.length);
      console.log("---");
    }
    expect(population.maxFitness(fitnessFunction)).to.be.closeTo(16, 0.01);
  });
});
