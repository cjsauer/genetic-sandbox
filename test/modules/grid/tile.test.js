import Tile from "../../../src/modules/grid/Tile";
import { expect } from "chai";
import { spy } from "sinon";

describe("Tile", () => {
  it("should be instantiable with an initial state object", () => {
    const hotTile = new Tile({ temperature: 110 });
    expect(hotTile).to.be.ok;
    expect(hotTile.get("temperature")).to.equal(110);
  });

  it("should each have a unique state object", () => {
    const initialComponents = { temperature: 75 };
    const tile1 = new Tile(initialComponents);
    const tile2 = new Tile(initialComponents);
    const tile3 = new Tile(initialComponents);
    tile1.set("unique", true);

    // Changes in one tile should not affect the other tiles that were
    // instantiated with the same default components object
    expect(tile1.get("unique")).to.be.true;
    expect(tile2.get("unique")).to.be.undefined;
    expect(tile3.get("unique")).to.be.undefined;
  });

  describe("components", () => {
    it("should be retrievable", () => {
      const dogeTile = new Tile({ dogeLevel: 9001 });
      expect(dogeTile.get("dogeLevel")).to.be.above(9000);
    });

    it("should return undefined for nonexistent keys", () => {
      const emptyTile = new Tile(/* No components */);
      const result = emptyTile.get("oops");
      expect(result).to.be.undefined;
    });

    it("can be checked for existence", () => {
      const coldTile = new Tile({
        temperature: -40
      });
      expect(coldTile.hasComponent("temperature")).to.be.true;
      expect(coldTile.hasComponent("isHot")).to.be.false;
    });

    it("should be mutable", () => {
      /* Create the island! */
      const island = new Tile({ elevation: 200 });
      expect(island.get("elevation")).to.equal(200);

      /* Sink the island! */
      island.set("elevation", -150);
      expect(island.get("elevation")).to.equal(-150);
    });

    it("should be created if they don't yet exist", () => {
      const freshTile = new Tile(/* No initial components */);
      expect(freshTile.get("habitable")).to.not.be.defined;
      freshTile.set("habitable", true);
      expect(freshTile.get("habitable")).to.be.true;
    });

    it("set function is chainable", () => {
      const numberTile = new Tile();
      numberTile.set("one", 1).set("two", 2).set("three", 3);
      expect(numberTile.get("one")).to.equal(1);
      expect(numberTile.get("two")).to.equal(2);
      expect(numberTile.get("three")).to.equal(3);
    });

    it("can be deleted", () => {
      const coldTile = new Tile({ temperature: -30 });

      expect(coldTile.get("temperature")).to.equal(-30);
      let didDelete = coldTile.delete("temperature");
      expect(didDelete).to.be.true;
      expect(coldTile.get("temperature")).to.be.undefined;

      didDelete = coldTile.delete("Non-existant key");
      expect(didDelete).to.be.false;
    });
  });

  describe("events", () => {
    it("should emit an event when a new component is added", () => {
      const tile = new Tile();
      const cb = spy();
      tile.addListener("componentAdded", cb);

      tile.set("newComponent", 0);
      expect(cb.calledWith({
        tile: tile,
        name: "newComponent"
      })).to.be.true;

      // Component is no longer "new"
      tile.set("newComponent", 1);
      expect(cb.calledTwice).to.be.false;
    });

    it("should emit an event when a component is deleted", () => {
      const tile = new Tile({
        someComponent: 0
      });
      const cb = spy();
      tile.addListener("componentDeleted", cb);

      tile.delete("someComponent");
      expect(cb.calledWith({
        tile: tile,
        name: "someComponent"
      })).to.be.true;
    });
  });
});
