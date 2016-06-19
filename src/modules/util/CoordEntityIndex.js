/**
 * An index providing fast lookup of Entities by their coordinate position
 */
class CoordEntityIndex {
  /**
   * Constructs an empty CoordEntityIndex
   */
  constructor() {
    /**
     * Map from Coord to Entity
     * @private
     * @type {Object}
     */
    this._map = {};
  }

  /**
   * Rebuilds the index of the given entities for fast lookup by their coordinate
   * positions (Coord component). If an entity does not contain a Coord
   * component, it is not included in the index.
   * @param {Entity[]} entities - array of entities to build the index for
   */
  rebuild(entities) {
    this._clear();
    entities.forEach((entity) => {
      if (entity.hasComponent("coord")) {
        let hash = this._hashCoord(entity.getComponent("coord"));
        if (this._map[hash] === undefined) {
          this._map[hash] = [];
        }
        this._map[hash].push(entity);
      }
    });
  }

  /**
   * Returns an array of entities that are located at the given coordinate
   * @param {Coord} coord - coordinate
   * @returns {Entity[]} array of entities with given coordinates
   */
  findEntitiesAt(coord) {
    let hash = this._hashCoord(coord);
    return this._map[hash] !== undefined ? this._map[hash] : [];
  }

  /**
   * Returns the current number of entities stored in the index
   * @returns {number} current number of entities stored in the index
   */
  get length() {
    return Object.keys(this._map).reduce((prev, curr) => {
      return prev + this._map[curr].length;
    }, 0);
  }

  /**
   * Completely clears the index, readying it for rebuilding
   * @private
   */
  _clear() {
    this._map = {};
  }

  /**
   * Hashes a Coord to a string for use as an object key
   * @private
   * @param {Coord} coord - the coordinate to hash
   * @returns {string} hashed coordinate string
   */
  _hashCoord(coord) {
    return coord.x + "," + coord.y;
  }
}

export default CoordEntityIndex;
