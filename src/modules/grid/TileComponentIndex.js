import MultiStringHashMap from "../util/MultiStringHashMap";

/**
 * Builds an index of {@link Tiles} for fast lookup by component
 */
class TileComponentIndex {
  /**
  * Creates a new TileComponentIndex with the given array of tiles.
  * Note: the index is built on demand. Constructing a new TileComponentIndex
  * does not actually build a complete index (which would be expensive),
  * but instead the indices are built as needed.
  * @example
  * const tiles = [
  *   new Tile(),
  *   new Tile(),
  *   new Tile()
  * ];
  * const tileIndex = new TileComponentIndex(tileIndex);
  * @param {Array.Tile} tiles - the array of tiles for which to build
  * an index by tile component
  */
  constructor(tiles) {
    /**
     * @type {Array.Tile}
     * @private
     */
    this._tiles = tiles;

    // Register for all tile events so that we can keep the index up to
    // date upon any changes.
    // Note that we need to bind `this`, because within the event handler
    // `this` would normally refer to the Tile itself.
    this._tiles.forEach((tile) => {
      tile.addListener("componentAdded", this._onTileComponentAdded.bind(this));
      tile.addListener("componentDeleted", this._onTileComponentDeleted.bind(this));
    });

    /**
     * @type {MultiStringHashMap}
     * @private
     */
    this._map = new MultiStringHashMap();
  }

  /**
   * Returns all tiles that posess the given component
   * @example
   * // Returns all tiles that have "biome" and "temperature" components
   * let habitatTiles = tileIndex.getTilesByComponent(["biome", "temperature"]);
   * @param {(string | Array.string)} names - the names of the components a
   * Tile must posess to be included in the result
   * @returns {Array.Tile} the tiles that include all of the given
   * components
   */
  getTilesByComponent(names) {
    // If the index entry does exist, we don't need to build it. We can assume
    // that the index has been kept up to date.
    if (!this._map.hasKey(names)) {
      this._buildIndex(names);
    }
    return this._map.get(names);
  }

  /**
   * Event handler called when a component is added to a tile to keep the
   * relevant indices up to date
   * @private
   * @param {object} e - the event object
   * @param {Tile} e.tile - the tile that is being updated
   * @param {string} e.name - the name of the component that was added
   */
  _onTileComponentAdded({tile, name}) {
    // Check for indices that the tile should now be included in
    let indexEntry;
    this._map.keys().forEach((key) => {
      // If this tile matches this index entry, but is NOT included in it,
      // add it to this index entry
      if (this._tileMatchesIndex(tile, key)) {
        indexEntry = this._map.get(key);
        if (!indexEntry.includes(tile)) {
          indexEntry.push(tile);
        }
      }
    });
  }

  /**
   * Event handler called when a name is deleted from a tile to keep the
   * relevant indices up to date
   * @private
   * @param {object} e - the event object
   * @param {Tile} e.tile - the tile that is being updated
   * @param {string} e.name - the name of the component that was deleted
   */
  _onTileComponentDeleted({tile, name}) {
    // Check for indices that the tile should now be removed from
    let index;
    this._map.keys().forEach((key) => {
      // If this tile does NOT match this index, but it is included in it,
      // remove it from that index
      if (!this._tileMatchesIndex(tile, key)) {
        index = this._map.get(key);
        if (index.includes(tile)) {
          index.splice(index.indexOf(tile), 1);
        }
      }
    });
  }

  /**
   * Private function that builds the index for the given group of
   * components. Loops over the _tiles array, and if a Tile contains
   * all of the given components, it is added to this index.
   * @private
   * @param {(string | Array.string)} names - the component
   * index to build
   */
  _buildIndex(names) {
    // Initialize the index to an empty array
    let index = [];

    // Try and add every tile to the index
    this._tiles.forEach((tile) => {
      if (this._tileMatchesIndex(tile, names)) {
        index.push(tile);
      }
    });

    this._map.set(names, index);
  }

  /**
   * Returns true if the given tile contains all of the given components
   * @private
   * @param {Tile} tile - the tile to check
   * @param {(string | Array.string)} names - the names to check
   * against
   */
  _tileMatchesIndex(tile, names) {
    if (typeof names === "string") {
      return tile.hasComponent(names);
    } else if (names.constructor === Array) {
      return names.every((name) => {
        return tile.hasComponent(name);
      });
    }
    return false;
  }
}

export default TileComponentIndex;
