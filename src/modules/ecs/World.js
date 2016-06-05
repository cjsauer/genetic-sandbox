import Family from "./Family";

/**
 * World is a container of all entities in existence, and provides super fast
 * lookup of entities by component
 * @see {Entity}
 * @see {System}
 */
class World {
  /**
   * And on the seventh day...
   */
  constructor() {
    /**
     * Map of family hash to family instance
     * @private
     * @type {Object}
     */
    this._families = {};

    /**
     * Map of entity ID to entity instance
     * @private
     * @type {Object}
     */
    this._entities = {};
  }

  /**
   * Adds the given entity to this world, or does nothing if that entity
   * is already in the world
   * @param {Entity} entity - the entity to add
   */
  addEntity(entity) {
    if (!this._entities.hasOwnProperty(entity.id)) {
      this._attemptAddToAllFamilies(entity);

      // Keep the families updated when adding/removing components to/from this
      // entity
      entity.addListener("componentAdded", ({ entity }) => {
        this._attemptAddToAllFamilies(entity);
      });
      entity.addListener("componentRemoved", (e) => {
        for (let key in this._families) {
          this._families[key].onComponentRemoved(e);
        }
      });

      this._entities[entity.id] = entity;
    }
  }

  /**
   * Retrieves all entities currently in the world
   * @returns {Entity[]} array of all entities in the world
   */
  getEntities() {
    return Object.keys(this._entities).map((key) => {
      return this._entities[key];
    });
  }

  /**
   * Retrieves an array of all entities that contain ALL of the given components
   * @param {...string} componentNames - The name of a component
   * @returns {Entity[]} the array of entities
   */
  getEntitiesWith(...componentNames) {
    let familyHash = Family.hashComponentNames(componentNames);

    // Ensure that a family exists for these component names
    if (!this._families.hasOwnProperty(familyHash)) {
      let family = new Family(componentNames);
      this._families[familyHash] = family;
      this.getEntities().forEach((entity) => {
        family.addEntityIfMatch(entity);
      });
    }

    return this._families[familyHash].getEntities();
  }

  /**
   * Attempts to add the given entity to every family
   * @private
   * @param {Entity} entity - the entity to add
   */
  _attemptAddToAllFamilies(entity) {
    for (let key in this._families) {
      this._families[key].addEntityIfMatch(entity);
    }
  }
}

export default World;