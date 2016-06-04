import TileComponentIndex from "./TileComponentIndex";
import Tile from "./Tile";
import { expect } from "chai";
import { spy } from "sinon";

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
    let tiles;

    tileIndex._buildIndex(["temperature", "biome"]);
    tiles = tileIndex._map.get(["temperature", "biome"]);
    expect(tiles).to.have.length(2);
    tiles.forEach((tile) => {
      expect(tile.hasComponent("temperature")).to.be.true;
      expect(tile.hasComponent("biome")).to.be.true;
    });

    tileIndex._buildIndex(["temperature", "vegetation"]);
    tiles = tileIndex._map.get(["temperature", "vegetation"]);
    expect(tiles).to.have.length(1);
    tiles.forEach((tile) => {
      expect(tile.hasComponent("temperature")).to.be.true;
      expect(tile.hasComponent("vegetation")).to.be.true;
    });

    tileIndex._buildIndex("enabled");
    tiles = tileIndex._map.get("enabled");
    expect(tiles).to.have.length(1);
    tiles.forEach((tile) => {
      expect(tile.hasComponent("enabled")).to.be.true;
    });

    tileIndex._buildIndex("whoops!");
    expect(tileIndex._map.get("whoops!")).to.have.length(0);
  });

  it("should build the index entries on demand", () => {
    const buildIndexSpy = spy(tileIndex, "_buildIndex");
    // The index should be empty initially
    expect(tileIndex._map.keys()).to.have.length(0);
    tileIndex.getTilesByComponent(["temperature", "biome"]);
    buildIndexSpy.restore();
    expect(buildIndexSpy.calledOnce).to.be.true;
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

  it("can decide whether or not a Tile belongs in a given index entry", () => {
    const components = ["temperature", "biome"];
    const badComponent = 42;
    const tileThatBelongsInIndex = tileIndex._tiles[0];
    const tileThatDoesNotBelongInIndex = tileIndex._tiles[3];
    expect(tileIndex._tileMatchesIndex(tileThatBelongsInIndex, "temperature")).to.be.true;
    expect(tileIndex._tileMatchesIndex(tileThatBelongsInIndex, components)).to.be.true;
    expect(tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, components)).to.be.false;
    expect(tileIndex._tileMatchesIndex(tileThatDoesNotBelongInIndex, badComponent)).to.be.false;
  });

  describe("_onTileComponentAdded", () => {
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

  describe("_onTileComponentDeleted", () => {
    it("removes the tile from the relevant indices", () => {
      // Assert initial conditions
      let tiles = tileIndex.getTilesByComponent(["temperature", "biome"]);
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByComponent("temperature");
      expect(tiles).to.have.length(2);
      tiles = tileIndex.getTilesByComponent("vegetation");
      expect(tiles).to.have.length(1);

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
