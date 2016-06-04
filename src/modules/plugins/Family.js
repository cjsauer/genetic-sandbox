/**
 * A collection of entities containing all of the specified components
 * @see {Entity}
 * @see {Component}
 */
class Family {
  /**
   * Creates a new family matching entities containing all of the given
   * components
   * @example
   * const family = new Family(["creature", "plant"]);
   * @param {string[]} componentNames - the names of the components that an
   * entity must contain all of to be included in this family
   */
  constructor(componentNames) {
    /**
     * The names of the components that an entity must contain all of to be
     * included in this family
     * @private
     * @type {string[]}
     */
    this._componentNames = componentNames;

    /**
     * Hash key representation of this family. Two families that require
     * the same components of their entities will hash to the same value.
     * @type {string}
     */
    this.hash = Family.hashComponentNames(this._componentNames);

    /**
     * Map of entity IDs to entities
     * @private
     * @type {Object}
     */
    this._entities = {};
  }

  /**
   * Adds the given entity to this family if it contains all of its specified
   * components
   * @example
   * const myEntity = new Entity();
   * myEntity.addComponent(new Plant(10));
   * const family = new Family(["plant"]);
   * family.addEntityIfMatch(myEntity);
   * @param {Entity} entity - the entity to add
   */
  addEntityIfMatch(entity) {
    let matches = this._componentNames.every((name) => {
      return entity.hasComponent(name);
    });

    if (matches) {
      this._entities[entity.id] = entity;
    }
  }

  /**
   * Removes the given entity from this family
   * @example
   * const myEntity = new Entity();
   * myEntity.addComponent(new Plant(10));
   * const family = new Family(["plant"]);
   * family.addEntityIfMatch(myEntity);
   * family.removeEntity(myEntity);
   * @param {Entity} entity - the entity to remove
   */
  removeEntity(entity) {
    if (this._entities.hasOwnProperty(entity.id)) {
      delete this._entities[entity.id];
    }
  }

  /**
   * Returns an array of all entities currently in this family
   * @example
   * family.getEntities().forEach((entity) => {
   *   // Do something with each entity
   * });
   * @returns {Entity[]} array of all entities in this family
   */
  getEntities() {
    return Object.keys(this._entities).map((key) => {
      return this._entities[key];
    });
  }

  /**
   * Event handler to be called when a component is removed from an entity.
   * If the component removed was required to qualify for this family,
   * the entity is removed from the family.
   * @example
   * myEntity.addListener("componentRemoved", family.onComponentRemoved.bind(family));
   * @param {Object} event - event object
   * @param {Entity} event.entity - the entity from which the component was
   * removed
   * @param {Component} event.component - the component that was removed
   */
  onComponentRemoved({ entity, component }) {
    if (this._componentNames.includes(component.name)) {
      this.removeEntity(entity);
    }
  }

  /**
  * Hash key representation of an array of component names
  * @example
  * Family.hashComponentNames(["a", "b", "c"]); // "$a,b,c"
  * @param {string[]} componentNames - array of component names
  * @returns {string} hash key representation of the passed array of component
  * names
  */
  static hashComponentNames(componentNames) {
    return "$" + componentNames.sort().join(",");
  }
}

export default Family;
