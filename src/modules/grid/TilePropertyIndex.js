import MultiStringHashMap from "../util/MultiStringHashMap";

/**
 * Builds an index of {@link Tiles} for fast lookup by property
 */
class TilePropertyIndex {
  /**
  * Creates a new TilePropertyIndex with the given array of tiles.
  * Note: the index is built on demand. Constructing a new TilePropertyIndex
  * does not actually build a complete index (which would be expensive),
  * but instead the indices are built as needed.
  * @example
  * const tiles = [
  *   new Tile(),
  *   new Tile(),
  *   new Tile()
  * ];
  * const tileIndex = new TilePropertyIndex(tileIndex);
  * @param {Array.Tile} tiles - the array of tiles for which to build
  * an index by tile property
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
      tile.addListener("propertyAdded", this.onTilePropertyAdded.bind(this));
      tile.addListener("propertyDeleted", this.onTilePropertyDeleted.bind(this));
    });

    /**
     * @type {MultiStringHashMap}
     * @private
     */
    this._index = new MultiStringHashMap();
  }

  /**
   * Returns all tiles that posess the given property or properties
   * @example
   * // Returns all tiles that have "biome" and "temperature" properties
   * let habitatTiles = tileIndex.getTilesByProperty(["biome", "temperature"]);
   * @param {(string | Array.string)} properties - the properties a tile
   * must posess to be included in the result
   * @returns {Array.Tile} the tiles that include all of the given
   * properties
   */
  getTilesByProperty(properties) {
    // If the index does exist, we don't need to build it. We can assume
    // that the index has been kept up to date.
    if (!this._index.hasKey(properties)) {
      this._buildIndex(properties);
    }
    return this._index.get(properties);
  }

  /**
   * Event handler called when a property is added to a tile to keep the
   * relevant indices up to date
   * @param {object} e - the event object
   * @param {Tile} e.tile - the tile that is being updated
   * @param {string} e.property - the property that was added
   */
  onTilePropertyAdded({tile, property}) {
    // Check for indices that the tile should now be included in
    let index;
    this._index.keys().forEach((key) => {
      // If this tile matches this index, but is NOT included in it,
      // add it to this index
      if (this._tileMatchesIndex(tile, key)) {
        index = this._index.get(key);
        if (!index.includes(tile)) {
          index.push(tile);
        }
      }
    });
  }

  /**
   * Event handler called when a property is deleted from a tile to keep the
   * relevant indices up to date
   * @param {object} e - the event object
   * @param {Tile} e.tile - the tile that is being updated
   * @param {string} e.property - the property that was deleted
   */
  onTilePropertyDeleted({tile, property}) {
    // Check for indices that the tile should now be removed from
    let index;
    this._index.keys().forEach((key) => {
      // If this tile does NOT match this index, but it is included in it,
      // remove it from that index
      if (!this._tileMatchesIndex(tile, key)) {
        index = this._index.get(key);
        if (index.includes(tile)) {
          index.splice(index.indexOf(tile), 1);
        }
      }
    });
  }

  /**
   * Private function that builds the index for the given group of
   * properties. Loops over the _tiles array, and if a Tile contains
   * all of the given properties, it is added to this index.
   * @private
   * @param {(string | Array.string)} properties - the property
   * index to build
   */
  _buildIndex(properties) {
    // Initialize the index to an empty array
    let index = [];

    // Try and add every tile to the index
    this._tiles.forEach((tile) => {
      if (this._tileMatchesIndex(tile, properties)) {
        index.push(tile);
      }
    });

    this._index.set(properties, index);
  }

  /**
   * Returns true if the given tile contains all of the given properties
   * @private
   * @param {Tile} tile - the tile to check
   * @param {(string | Array.string)} properties - the props to check
   * against
   */
  _tileMatchesIndex(tile, properties) {
    if (typeof properties === "string") {
      return tile.hasProperty(properties);
    } else if (properties.constructor === Array) {
      return properties.every((prop) => {
        return tile.hasProperty(prop);
      });
    }
    return false;
  }
}

export default TilePropertyIndex;
