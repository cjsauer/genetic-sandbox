import EventEmitter from "wolfy87-eventemitter";

/**
 * An entity is a container of Components, and represents all "things" in the
 * world
 * @see {@link Component}
 */
class Entity extends EventEmitter {
  /**
   * Creates a new, empty Entity
   * @example
   * const myEntity = new Entity();
   */
  constructor() {
    super();

    /**
     * Unique ID of this entity
     * @type {number}
     */
    this.id = Entity._id++;

    /**
     * Map of component names to components
     * @private
     * @type {Object}
     */
    this._components = {};
  }

  /**
   * Returns the component with the given name, or null if it does not exist
   * @example
   * let plant = myEntity.getComponent("plant");
   * @param {string} name - Name of the component
   * @returns {Component} the component, or null if it does not exist
   */
  getComponent(name) {
    return this.hasComponent(name) ? this._components[name] : null;
  }

  /**
   * Returns true if this entity has the given component, false otherwise
   * @param {string} name - the name of the component to check for
   * @returns {boolean} True if the entity has the given component, false
   * otherwise
   */
  hasComponent(name) {
    return this._components.hasOwnProperty(name);
  }

  /**
   * Adds the given component to this entity
   * @example
   * myEntity.addComponent(new Plant(10));
   * @fires Entity#componentAdded
   * @param {Component} component - the component instance to add
   */
  addComponent(component) {
    this._components[component.name] = component;
    /**
    * Fired when a new component is added to an entity
    * @event Entity#componentAdded
    * @type {object}
    * @property {Entity} entity - the entity that was modified
    * @property {string} name - the name of the component that was added
    */
    this.emitEvent("componentAdded", [{ entity: this, component }]);
  }

  /**
   * Removes the specified component from this entity
   * @example
   * myEntity.addComponent(new Plant(10));
   * myEntity.removeComponent("plant");
   * @fires Entity#componentDeleted
   * @param {string} name - name of the component to delete
   */
  removeComponent(name) {
    if (this.hasComponent(name)) {
      let component = this._components[name];
      delete this._components[name];
      /**
       * Fired when a component is deleted from a entity
       * @event Entity#componentDeleted
       * @type {object}
       * @property {Entity} entity - the entity that was modified
       * @property {string} name - name of the component that was deleted
       */
      this.emitEvent("componentRemoved", [{ entity: this, component }]);
    }
  }
}

/**
* Counter providing unique IDs to each new entity
* @private
* @type {number}
*/
Entity._id = 1;

export default Entity;
