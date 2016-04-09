import Grid from "../../../src/modules/grid/Grid";
import chai from "chai";
const expect = chai.expect;

describe("Abstract Grid", () => {
  class DummyGrid extends Grid {
    /* An empty implementation of a concrete Grid subclass */
  }

  it("should not be instantiable directly", () => {
    expect(() => new Grid()).to.throw(TypeError);
  });

  it("should throw an error when trying to call unimplemented methods", () => {
    const dummyGrid = new DummyGrid();
    expect(dummyGrid.getTile).to.throw(Error, /must be implemented/);
    expect(dummyGrid.getTiles).to.throw(Error, /must be implemented/);
    expect(dummyGrid.neighborsOf).to.throw(Error, /must be implemented/);
    expect(dummyGrid.distanceBetween).to.throw(Error, /must be implemented/);
  });

  it("can be properly extended to define new types of grids", () => {
    /* Very simple implementation of a 1D, finite number grid */
    class SimpleGrid extends Grid {
      constructor() {
        super();
        this.tiles = [0, 1, 2, 3, 4, 5];
      }

      getTile(i) {
        return this.tiles[i];
      }

      neighborsOf(i) {
        return [
          this.tiles[(i - 1) % this.tiles.length],
          this.tiles[(i + 1) % this.tiles.length]
        ];
      }

      distanceBetween(i1, i2) {
        return Math.abs(i1 - i2);
      }
    }

    const simpleGrid = new SimpleGrid();
    expect(simpleGrid).to.be.ok;
    expect(simpleGrid.getTile(3)).to.equal(3);
    expect(simpleGrid.neighborsOf(2)).to.eql([1, 3]);
    expect(simpleGrid.distanceBetween(4, 1)).to.equal(3);
  });
});
