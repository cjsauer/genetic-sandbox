import TileComponentIndex from "../../../src/modules/grid/TileComponentIndex";
import Tile from "../../../src/modules/grid/Tile";
import chai from "chai";
import { spy } from "sinon";
const expect = chai.expect;

describe("TileComponentIndex", () => {
  let tileIndex;

  beforeEach(() => {
    tileIndex = new TileComponentIndex([
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
      new Tile(/* no components */)
    ]);
  });

  it("should be instantiable given an array of tiles", () => {
    const tiles = [
      new Tile(),
      new Tile(),
      new Tile()
    ];
    const newTileIndex = new TileComponentIndex(tiles);
    expect(newTileIndex).to.be.ok;
  });

  it("should register as a listener for tile events", () => {
    const tiles = [
      new Tile(),
      new Tile(),
      new Tile()
    ];

    tiles.forEach((tile) => {
      spy(tile, "addListener");
    });

    const newTileIndex = new TileComponentIndex(tiles);
    newTileIndex._tiles.forEach((tile) => {
      expect(tile.addListener.calledWith("componentAdded")).to.be.true;
      expect(tile.addListener.calledWith("componentDeleted")).to.be.true;
    });
  });

  it("can build an index of tiles by component", () => {
    let index;

    tileIndex._buildIndex(["temperature", "biome"]);
    index = tileIndex._index.get(["temperature", "biome"]);
    expect(index).to.have.length(2);
    index.forEach((tile) => {
      expect(tile.hasComponent("temperature")).to.be.true;
      expect(tile.hasComponent("biome")).to.be.true;
    });

    tileIndex._buildIndex(["temperature", "vegetation"]);
    index = tileIndex._index.get(["temperature", "vegetation"]);
    expect(index).to.have.length(1);
    index.forEach((tile) => {
      expect(tile.hasComponent("temperature")).to.be.true;
      expect(tile.hasComponent("vegetation")).to.be.true;
    });

    tileIndex._buildIndex("enabled");
    index = tileIndex._index.get("enabled");
    expect(index).to.have.length(1);
    index.forEach((tile) => {
      expect(tile.hasComponent("enabled")).to.be.true;
    });

    tileIndex._buildIndex("whoops!");
    expect(tileIndex._index.get("whoops!")).to.have.length(0);
  });

  it("should build the index on demand", () => {
    spy(tileIndex, "_buildIndex");
    // The index should be empty initially
    expect(tileIndex._index.keys()).to.have.length(0);
    tileIndex.getTilesByComponent(["temperature", "biome"]);
    expect(tileIndex._buildIndex.called).to.be.true;
    tileIndex._buildIndex.restore();
  });

  it("can return a list of tiles that possess a set of components", () => {
    let tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
    expect(tiles).to.have.length(2);
    tiles.forEach((tile) => {
      expect(tile.hasComponent("temperature")).to.be.true;
      expect(tile.hasComponent("biome")).to.be.true;
    });
    tiles = tileIndex.getTilesByComponent("enabled");
    expect(tiles).to.have.length(1);
    tiles.forEach((tile) => {
      expect(tile.hasComponent("enabled")).to.be.true;
    });
  });

  it("can decide whether or not a Tile belongs in a given index", () => {
    const component = "temperature";
    const components = ["temperature", "biome"];
    const badComponent = 42;
    const tileThatBelongsInIndex = tileIndex._tiles[0];
    const tileThatDoesNotBelongInIndex = tileIndex._tiles[3];
    const trueResult = tileIndex._tileMatchesIndex(tileThatBelongsInIndex, component);
    const trueResult2 = tileIndex._tileMatchesIndex(tileThatBelongsInIndex, components);
    const falseResult = tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, components);
    const falseResult2 = tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, badComponent);
    expect(trueResult).to.be.true;
    expect(trueResult2).to.be.true;
    expect(falseResult).to.be.false;
    expect(falseResult2).to.be.false;
  });

  describe("onTileComponentAdded", () => {
    it("adds the updated tile to the relevant indices", () => {
      // Assert initial conditions
      let tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByComponent("temperature");
      expect(tiles).to.have.length(2);

      // Tile 3 refers to the empty tile from the fixture
      const tileToUpdate = tileIndex._tiles[3];
      tileToUpdate.set("temperature", 60);
      tileToUpdate.set("biome", "temperate");

      // Updated tile should be added to the correct indices
      tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
      expect(tiles).to.have.length(3);
      tiles = tileIndex.getTilesByComponent("temperature");
      expect(tiles).to.have.length(3);
    });
  });

  describe("onTileComponentDeleted", () => {
    it("removes the tile from the relevant indices", () => {
      // Assert initial conditions
      let tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByComponent("temperature");
      expect(tiles).to.have.length(2);

      // Tile 0 refers to the "desert" tile in the fixutre
      const tileToUpdate = tileIndex._tiles[0];
      tileToUpdate.delete("temperature");
      tileToUpdate.delete("biome");

      // Updated tile should have been removed from the relevant indices
      tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
      expect(tiles).to.have.length(1);
      tiles = tileIndex.getTilesByComponent("temperature");
      expect(tiles).to.have.length(1);
    });
  });
});
