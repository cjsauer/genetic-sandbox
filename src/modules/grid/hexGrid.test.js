import HexGrid from "./HexGrid";
import Coord from "../plugins/core/components/Coord";
import { expect } from "chai";

describe("HexGrid", () => {
  it("should be instantiable given a radius in tiles", () => {
    /* Create a HexGrid of 0 tile radius */
    const hexGrid0 = new HexGrid(0);
    expect(hexGrid0.radius).to.equal(0);

    /* Create a HexGrid of 1 tile radius */
    const hexGrid1 = new HexGrid(1);
    expect(hexGrid1.radius).to.equal(1);
  });

  it("can build an array of tile entities representing itself", () => {
    /* Create a HexGrid of 0 tile radius */
    const hexGrid0 = new HexGrid(0);
    /* There should be 1 hexagonal tile inside of a HexGrid of radius 0 */
    expect(hexGrid0.buildTiles()).to.have.lengthOf(1);

    /* Create a HexGrid of 1 tile radius */
    const hexGrid1 = new HexGrid(1);
    /* There should be 7 hexagonal tiles inside of a HexGrid of radius 1 */
    expect(hexGrid1.buildTiles()).to.have.lengthOf(7);

    /* Create a HexGrid of 2 tile radius */
    const hexGrid2 = new HexGrid(2);
    /* There should be 19 hexagonal tiles inside of a HexGrid of radius 2 */
    expect(hexGrid2.buildTiles()).to.have.lengthOf(19);

    /* Create a HexGrid of 3 tile radius */
    const hexGrid3 = new HexGrid(3);
    /* There should be 37 hexagonal tiles inside of a HexGrid of radius 3 */
    expect(hexGrid3.buildTiles()).to.have.lengthOf(37);
  });

  it("can calculate the distance between tiles", () => {
    const hexGrid = new HexGrid(5);
    expect(hexGrid.distanceBetween(new Coord(0, 0), new Coord(0, 0))).to.equal(0);
    expect(hexGrid.distanceBetween(new Coord(0, 0), new Coord(3, 0))).to.equal(3);
    expect(hexGrid.distanceBetween(new Coord(0, 0), new Coord(2, 1))).to.equal(3);
    expect(hexGrid.distanceBetween(new Coord(0, 0), new Coord(-3, 1))).to.equal(3);
    expect(hexGrid.distanceBetween(new Coord(-1, 3), new Coord(3, -5))).to.equal(8);
    expect(hexGrid.distanceBetween(new Coord(-5, 5), new Coord(5, -4))).to.equal(10);
  });

  it("can determine if the given coordinates are a valid location on the grid", () => {
    const hexGrid = new HexGrid(1);
    const coord1 = new Coord(0, 0);
    const coord2 = new Coord(1, 0);
    const coord3 = new Coord(0, -1);
    const coord4 = new Coord(0, -2);
    const coord5 = new Coord(1, 1);
    const coord6 = new Coord(-1, -1);

    expect(hexGrid.isValidCoord(coord1)).to.be.true;
    expect(hexGrid.isValidCoord(coord2)).to.be.true;
    expect(hexGrid.isValidCoord(coord3)).to.be.true;
    expect(hexGrid.isValidCoord(coord4)).to.be.false;
    expect(hexGrid.isValidCoord(coord5)).to.be.false;
    expect(hexGrid.isValidCoord(coord6)).to.be.false;
  });

  describe("neighbors", () => {
    it("can be calculated for a given coordinate", () => {
      const hexGrid = new HexGrid(1);
      const expectedCoords = [
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [0, -1],
        [1, -1]
      ];
      const expectedNeighbors = expectedCoords.map(([x, y]) => {
        return new Coord(x, y);
      });

      const neighbors = hexGrid.neighborsOf(new Coord(0, 0));

      expect(neighbors).to.deep.equal(expectedNeighbors);
    });
  });

  it("can calculate the position of a hex from its coordinates", () => {
    const hexGrid = new HexGrid(0);
    let errorMargin = 0.001;
    let pixelPos = hexGrid.coordToPixel(new Coord(0, 0), 10);
    expect(pixelPos).to.deep.equal({ x: 0, y: 0 });

    pixelPos = hexGrid.coordToPixel(new Coord(1, 0), 10);
    expect(pixelPos.x).to.be.closeTo(8.6603, errorMargin);
    expect(pixelPos.y).to.equal(15);

    pixelPos = hexGrid.coordToPixel(new Coord(0, 1), 10);
    expect(pixelPos.x).to.be.closeTo(17.3205, errorMargin);
    expect(pixelPos.y).to.equal(0);

    pixelPos = hexGrid.coordToPixel(new Coord(-1, 1), 10);
    expect(pixelPos.x).to.be.closeTo(8.66025, errorMargin);
    expect(pixelPos.y).to.equal(-15);

    pixelPos = hexGrid.coordToPixel(new Coord(1, -1), 10);
    expect(pixelPos.x).to.be.closeTo(-8.66025, errorMargin);
    expect(pixelPos.y).to.equal(15);
  });

  describe("internal conversion functions", () => {
    it("can covert from cubic coordinates to axial", () => {
      expect(HexGrid._cubicToAxial(1, 2, 3)).to.deep.equal({q: 1, r: 3});
      expect(HexGrid._cubicToAxial(-1, 5, 0)).to.deep.equal({q: -1, r: 0});
      expect(HexGrid._cubicToAxial(17, 3, -12)).to.deep.equal({q: 17, r: -12});
    });

    it("can convert from axial coordinates to cubic", () => {
      expect(HexGrid._axialToCubic(1, 2)).to.deep.equal({x: 1, y: -3, z: 2});
      expect(HexGrid._axialToCubic(-1, 2)).to.deep.equal({x: -1, y: -1, z: 2});
      expect(HexGrid._axialToCubic(1, -2)).to.deep.equal({x: 1, y: 1, z: -2});
    });
  });
});
