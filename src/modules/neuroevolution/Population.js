import _ from "lodash";
import Species from "./Species";

/**
 * Collection of entities capable of evolution
 */
class Population {
  /**
   * Builds a new population, running each genome in the given genomes array
   * through the given phenotype function
   * @param {Array.<*>} [genomes=[]] - array of genomes
   * @param {Function} phenomeFunction - function that takes in a single
   * genome and produces its phenome
   */
  constructor(genomes = [], phenomeFunction) {
    /**
     * Function used to decode a genome into its phenome
     * @private
     * @type {Function}
     */
    this._phenomeFunction = phenomeFunction;
    if (this._phenomeFunction === undefined) {
      // The default phenome function just echos back the given genome
      this._phenomeFunction = (genome) => genome;
    }

    /**
    * A grouping of a genome and the phenome it represents
    * @typedef {Object} Population~Entity
    * @property {*} genome - the genetic representation of an entity
    * @property {*} phenome - the concrete "thing" that the genome describes
    */

    /**
    * Array of entities in this population
    * @type {Population~Entity[]}
    */
    this.entities = _.zipWith(genomes, genomes.map(this._phenomeFunction), (genome, phenome) => {
      return { genome, phenome };
    });

    /**
     * Array of species in this population
     * @type {Species[]}
     */
    this.species = [];
  }

  /**
   * Chunks this population's entities up into species. Representatives
   * from the last call to speciate() are maintained, but each species
   * list of members is cleared before speciation takes place.
   * @param {number} compatibilityThreshold - genomes must have a compatibility
   * distance less than this number to be considered the same species
   * @param {Function} compatibilityDistanceFunction - function taking two
   * genomes as arguments and returning their compatibility distance
   * @returns {Species[]} array of species
   */
  speciate(compatibilityThreshold, compatibilityDistanceFunction) {
    const species = this.species;
    species.forEach((specie) => specie.clear());
    const compatibilityFunction = (g1, g2) => {
      return compatibilityDistanceFunction(g1, g2) <= compatibilityThreshold;
    };

    // Try adding every genome to a species, creating a new one if it isn't
    // compatible with any species
    this.entities.forEach((entity) => {
      let foundSpecies = species.some((specie) => {
        return specie.addEntityIfCompatible(entity, compatibilityFunction);
      });

      if (!foundSpecies) {
        species.push(new Species(entity));
      }
    });
  }

  /**
   * Prunes away extinct and stagnant species
   * @param {number} stagnancyLimit - number of calls without an improvement
   * to fitness required for a species to be considered stagnant
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   */
  pruneSpecies(stagnancyLimit, fitnessFunction) {
    this.species = this.species.filter((specie) => {
      return specie.entities.length > 0 &&
             !specie.isStagnant(stagnancyLimit, fitnessFunction);
    });
  }

  /**
   * Returns the maximum fitness score from this population
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   * @returns {number} maximum fitness score currently in this population
   */
  maxFitness(fitnessFunction) {
    return _.max(this.entities.map(fitnessFunction));
  }

  /**
   * Returns the entity that currently has the highest fitness score
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   * @returns {Population~Entity} entity with the maximum fitness score
   * currently in this population
   */
  bestEntity(fitnessFunction) {
    return _.maxBy(this.entities, fitnessFunction);
  }

  /**
   * Returns the sum of all species average fitness scores
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   * @returns {number} sum of all species average fitness score
   */
  totalAverageFitness(fitnessFunction) {
    return this.species
      .map((specie) => specie.fitness(fitnessFunction))
      .reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Returns an array containing the champion from each species with at least
   * the given number of entities
   * @param {number} minimumCount - the minimum number of entities a species
   * needs to have its champion included in the result
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   * @returns {Population~Entity[]} array containing the champion from each
   * eligible species
   */
  champions(minimumCount, fitnessFunction) {
    return this.species
      .filter((specie) => specie.entities.length >= minimumCount)
      .map((specie) => specie.champion(fitnessFunction));
  }

  /**
   * Evolves the current population
   * @param {number} compatibilityThreshold - genomes must have a compatibility
   * distance less than this number to be considered the same species
   * @param {number} crossoverRate - the percentage of the population that
   * will partake in crossover
   * @param {Function} fitnessFunction - function that takes in a single
   * entity and returns its fitness score
   * @param {Function} compatibilityDistanceFunction - function that takes
   * in two genomes and returns their compatibility distance
   * @param {Function} mutateFunction - function that takes in a genome and
   * produces a randomly mutated variant of it
   * @param {Function} crossoverFunction - function that takes in two
   * entities and returns their crossed over genome
   * @param {Object} random - an instance of a random-js number generator
   */
  evolve(compatibilityThreshold, crossoverRate, fitnessFunction, compatibilityDistanceFunction, mutateFunction, crossoverFunction, random) {
    let nextGeneration = [];
    let totalEntities = this.entities.length;
    let entitiesStillNeeded = totalEntities;

    // Chunk the population up into species retaining the last evolution's
    // species representatives
    this.speciate(compatibilityThreshold, compatibilityDistanceFunction);

    // Prune away species that are now extinct or stagnant
    this.pruneSpecies(15, fitnessFunction);

    // Copy the champions of species with 5 or more entities to next generation
    const champions = this.champions(5, fitnessFunction);
    nextGeneration = _.concat(nextGeneration, champions);
    entitiesStillNeeded -= champions.length;

    // For each species, figure out what proportion of the next generation
    // it deserves, and mutate/crossover its entities to produce the next
    // generation
    let totalFitness = this.totalAverageFitness(fitnessFunction);
    this.species.forEach((specie) => {
      let averageFitness = specie.fitness(fitnessFunction);
      let proportion = totalFitness > 0 ? (averageFitness / totalFitness) : 1;
      let count = Math.ceil(totalEntities * proportion);
      // console.log("   Average fitness: " + averageFitness);
      // console.log("   Proportion: " + proportion);
      // console.log("   Count: " + count);

      for (let i = 0; (i < count) && (entitiesStillNeeded > 0); i++, entitiesStillNeeded--) {
        let genome;
        // if (specie.entities.length > 1 && random.bool(crossoverRate)) {
        //   let mother = random.pick(specie.entities);
        //   let father = random.pick(_.without(specie.entities, mother));
        //   genome = crossoverFunction(mother, father);
        // } else {
        let randomEntity = random.pick(specie.entities);
        genome = mutateFunction(randomEntity).genome;
        // }
        let phenome = this._phenomeFunction(genome);
        nextGeneration.push({ genome, phenome });
      }
    });

    this.entities = nextGeneration;
  }
}

export default Population;
