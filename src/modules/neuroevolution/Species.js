import _ from "lodash";

/**
 * Collection of genetically compatible entities
 */
class Species {
  /**
   * Constructs a new species with the passed argument as the specie's
   * representative, and adds the representative to itself
   * @param {*} representative - the specie's representative that all potential
   * candidates will be compared against for inclusion
   */
  constructor(representative) {
    /**
     * This specie's representative that all potential candidates will be
     * compared against for inclusion
     * @type {*}
     */
    this.representative = representative;

    /**
     * Array of entities that have been added to this species
     * @type {Array}
     */
    this.entities = [ representative ];
  }

  /**
   * Returns the average fitness of this species, passing each entity into the
   * given fitness function to retrieve its fitness score
   * @param {Function} fitnessFunc - function taking a single entity as its
   * argument and returning that entity's fitness score
   */
  fitness(fitnessFunc) {
    if (this.entities.length === 0) return 0;
    return this.entities
      .map(fitnessFunc).reduce((prev, curr) => {
        return prev + curr;
      }, 0) / this.entities.length;
  }

  /**
   * Returns true if this species average fitness has not improved after the
   * given number of calls to isStagnant()
   * @param {number} stagnancyLimit - number of calls without an improvement to
   * fitness required for a species to be considered stagnant
   * @param {Function} fitnessFunc - function taking a single entity as its
   * argument and returning that entity's fitness score
   * @returns {boolean} true if this species is stagnant, false otherwise
   */
  isStagnant(stagnancyLimit, fitnessFunc) {
    let currentFitnessScore = this.fitness(fitnessFunc);
    this._maxFitnessScore = this._maxFitnessScore || currentFitnessScore;
    this._stagnantPotential = this._stagnantPotential || 0;
    if (currentFitnessScore > this._maxFitnessScore) {
      this._maxFitnessScore = currentFitnessScore;
      this._stagnantPotential = 0;
    } else if (++this._stagnantPotential >= stagnancyLimit) {
      return true;
    }
    return false;
  }

  /**
   * Adds the given entity to this species if it is found compatible with
   * the representative by using the given compatibility function to compare
   * @param {*} entity - the entity to try and add
   * @param {Function} compatibilityFunc - a function taking two entities as
   * arguments and returning true if the two are found compatible, false
   * otherwise
   * @returns {boolean} true if the entity was successfully added, false
   * otherwise
   */
  addEntityIfCompatible(entity, compatibilityFunc) {
    if (compatibilityFunc(this.representative, entity)) {
      this.entities.push(entity);
      return true;
    }
    return false;
  }

  /**
   * Returns the entity with the highest fitness in this species
   * @param {Function} fitnessFunc - function taking a single entity as its
   * argument and returning that entity's fitness score
   * @returns {*} the entity with the highest fitness in this species
   */
  champion(fitnessFunc) {
    if (this.entities.length === 0) return null;
    return _.maxBy(this.entities, fitnessFunc);
  }

  /**
   * Clears out this specie's entities, including the representative. The
   * representative of the species itself remains, however. It is just no
   * longer included in its own members list.
   */
  clear() {
    this.entities = [];
  }
}

export default Species;
