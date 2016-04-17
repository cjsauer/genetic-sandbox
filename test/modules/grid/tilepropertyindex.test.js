import TilePropertyIndex from "../../../src/modules/grid/TilePropertyIndex";
import Tile from "../../../src/modules/grid/Tile";
import chai from "chai";
import sinon from "sinon";
const expect = chai.expect;

describe("TilePropertyIndex", () => {
  let tileIndex;

  beforeEach(() => {
    tileIndex = new TilePropertyIndex([
      new Tile({
        temperature: 120,
        biome: "desert",
        vegetation: ["cactus", "wildflowers"]
      }),
      new Tile({
        temperature: -40,
        biome: "tundra"
      }),
      new Tile({
        enabled: false
      }),
      new Tile(/* no properties */)
    ]);
  });

  it("should be instantiable given an array of tiles", () => {
    const tiles = [
      new Tile(),
      new Tile(),
      new Tile()
    ];
    const newTileIndex = new TilePropertyIndex(tiles);
    expect(newTileIndex).to.be.ok;
  });

  it("should register as a listener for tile events", () => {
    const tiles = [
      new Tile(),
      new Tile(),
      new Tile()
    ];

    tiles.forEach((tile) => {
      sinon.spy(tile, "addListener");
    });

    const newTileIndex = new TilePropertyIndex(tiles);
    newTileIndex._tiles.forEach((tile) => {
      expect(tile.addListener.calledWith("propertyAdded")).to.be.true;
      expect(tile.addListener.calledWith("propertyDeleted")).to.be.true;
    });
  });

  it("can build an index of tiles by property", () => {
    let index;

    tileIndex._buildIndex(["temperature", "biome"]);
    index = tileIndex._index.get(["temperature", "biome"]);
    expect(index).to.have.length(2);
    index.forEach((tile) => {
      expect(tile.hasProperty("temperature")).to.be.true;
      expect(tile.hasProperty("biome")).to.be.true;
    });

    tileIndex._buildIndex(["temperature", "vegetation"]);
    index = tileIndex._index.get(["temperature", "vegetation"]);
    expect(index).to.have.length(1);
    index.forEach((tile) => {
      expect(tile.hasProperty("temperature")).to.be.true;
      expect(tile.hasProperty("vegetation")).to.be.true;
    });

    tileIndex._buildIndex("enabled");
    index = tileIndex._index.get("enabled");
    expect(index).to.have.length(1);
    index.forEach((tile) => {
      expect(tile.hasProperty("enabled")).to.be.true;
    });

    tileIndex._buildIndex("whoops!");
    expect(tileIndex._index.get("whoops!")).to.have.length(0);
  });

  it("should build the index on demand", () => {
    tileIndex._buildIndex = sinon.spy();
    // The index should be empty initially
    expect(tileIndex._index.keys()).to.have.length(0);
    tileIndex.getTilesByProperty(["temperature", "biome"]);
    expect(tileIndex._buildIndex.called).to.be.true;
  });

  it("can return a list of tiles that possess a set of properties", () => {
    let tiles = tileIndex.getTilesByProperty(["temperature", "biome"]);
    expect(tiles).to.have.length(2);
    tiles.forEach((tile) => {
      expect(tile.hasProperty("temperature")).to.be.true;
      expect(tile.hasProperty("biome")).to.be.true;
    });
    tiles = tileIndex.getTilesByProperty("enabled");
    expect(tiles).to.have.length(1);
    tiles.forEach((tile) => {
      expect(tile.hasProperty("enabled")).to.be.true;
    });
  });

  it("can decide whether or not a Tile belongs in a given index", () => {
    const property = "temperature";
    const properties = ["temperature", "biome"];
    const badProperty = 42;
    const tileThatBelongsInIndex = tileIndex._tiles[0];
    const tileThatDoesNotBelongInIndex = tileIndex._tiles[3];
    const trueResult = tileIndex._tileMatchesIndex(tileThatBelongsInIndex, properties);
    const trueResult2 = tileIndex._tileMatchesIndex(tileThatBelongsInIndex, property);
    const falseResult = tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, properties);
    const falseResult2 = tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, badProperty);
    expect(trueResult).to.be.true;
    expect(trueResult2).to.be.true;
    expect(falseResult).to.be.false;
    expect(falseResult2).to.be.false;
  });

  describe("onTilePropertyAdded", () => {
    it("adds the updated tile to the relevant indices", () => {
      // Assert initial conditions
      let tiles = tileIndex.getTilesByProperty(["temperature", "biome"]);
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByProperty("temperature");
      expect(tiles).to.have.length(2);

      // Tile 3 refers to the empty tile from the fixture
      const tileToUpdate = tileIndex._tiles[3];
      tileToUpdate.set("temperature", 60);
      tileToUpdate.set("biome", "temperate");

      // Updated tile should be added to the correct indices
      tiles = tileIndex.getTilesByProperty(["temperature", "biome"]);
      expect(tiles).to.have.length(3);
      tiles = tileIndex.getTilesByProperty("temperature");
      expect(tiles).to.have.length(3);
    });
  });

  describe("onTilePropertyDeleted", () => {
    it("removes the tile from the relevant indices", () => {
      // Assert initial conditions
      let tiles = tileIndex.getTilesByProperty(["temperature", "biome"]);
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByProperty("temperature");
      expect(tiles).to.have.length(2);

      // Tile 0 refers to the "desert" tile in the fixutre
      const tileToUpdate = tileIndex._tiles[0];
      tileToUpdate.delete("temperature");
      tileToUpdate.delete("biome");

      // Updated tile should have been removed from the relevant indices
      tiles = tileIndex.getTilesByProperty(["temperature", "biome"]);
      expect(tiles).to.have.length(1);
      tiles = tileIndex.getTilesByProperty("temperature");
      expect(tiles).to.have.length(1);
    });
  });
});
