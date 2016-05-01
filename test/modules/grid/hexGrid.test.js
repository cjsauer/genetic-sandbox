import HexGrid from "../../../src/modules/grid/HexGrid";
import Tile from "../../../src/modules/grid/Tile";
import Coord from "../../../src/modules/grid/Coord";
import { expect } from "chai";

describe("HexGrid", () => {
  it("should be instantiable given a radius in tiles", () => {
    /* Create a HexGrid of 0 tile radius */
    const hexGrid0 = new HexGrid(0);
    expect(hexGrid0).to.be.ok;
    /* There should be 1 hexagonal tile inside of a HexGrid of radius 0 */
    expect(hexGrid0.getTiles()).to.have.length(1);

    /* Create a HexGrid of 1 tile radius */
    const hexGrid1 = new HexGrid(1);
    expect(hexGrid1).to.be.ok;
    /* There should be 7 hexagonal tiles inside of a HexGrid of radius 1 */
    expect(hexGrid1.getTiles()).to.have.length(7);

    /* Create a HexGrid of 2 tile radius */
    const hexGrid2 = new HexGrid(2);
    expect(hexGrid2).to.be.ok;
    /* There should be 19 hexagonal tiles inside of a HexGrid of radius 2 */
    expect(hexGrid2.getTiles()).to.have.length(19);

    /* Create a HexGrid of 3 tile radius */
    const hexGrid3 = new HexGrid(3);
    expect(hexGrid3).to.be.ok;
    /* There should be 37 hexagonal tiles inside of a HexGrid of radius 3 */
    expect(hexGrid3.getTiles()).to.have.length(37);
  });

  it("should be instantiable with default components", () => {
    const desertGrid = new HexGrid(3, {
      temperature: 130,
      biome: "desert"
    });

    expect(desertGrid).to.be.ok;
    desertGrid.getTiles().forEach((tile) => {
      expect(tile.get("temperature")).to.equal(130);
      expect(tile.get("biome")).to.equal("desert");
    });
  });

  it("passes each tile's coordinates in addition to default components", () => {
    const hexGrid = new HexGrid(1, {
      someOtherComponent: true
    });
    const coords = [
      [0, 0],
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [0, -1],
      [1, -1]
    ];

    coords.forEach(([x, y]) => {
      let tile = hexGrid.getTile(new Coord(x, y));
      let coord = tile.get("coord");
      expect(coord.x).to.equal(x);
      expect(coord.y).to.equal(y);
      expect(tile.get("someOtherComponent")).to.be.true;
    });
  });

  it("passes a reference to itself in addition to default components", () => {
    const hexGrid = new HexGrid(1, {
      someOtherComponent: true
    });
    const coords = [
      [0, 0],
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [0, -1],
      [1, -1]
    ];

    coords.forEach(([x, y]) => {
      let tile = hexGrid.getTile(new Coord(x, y));
      expect(tile.get("grid")).to.equal(hexGrid);
      expect(tile.get("someOtherComponent")).to.be.true;
    });
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

  describe("tiles", () => {
    it("should all be retrievable", () => {
      const hexGrid = new HexGrid(2);
      expect(hexGrid.getTiles()).to.be.instanceof(Array);
      expect(hexGrid.getTiles()).to.have.length(19);
    });

    it("should be individually retrievable", () => {
      const hexGrid = new HexGrid(2);
      const validCoords = [
        [0, 0],
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [0, -1],
        [1, -1]
      ];

      validCoords.forEach(([x, y]) => {
        const tile = hexGrid.getTile(new Coord(x, y));
        expect(tile).to.be.instanceof(Tile);
      });
    });

    it("should be retrievable by component", () => {
      const hexGrid = new HexGrid(2, {
        biome: "desert",
        temperature: 120
      });
      hexGrid.getTile(new Coord(0, 0)).set("unique", true);

      const habitatTiles = hexGrid.getTilesByComponent(["biome", "temperature"]);
      expect(habitatTiles).to.have.length(hexGrid.getTiles().length);

      const uniqueTiles = hexGrid.getTilesByComponent("unique");
      expect(uniqueTiles).to.have.length(1);
    });

    it("should throw an error when indexed out of bounds", () => {
      const hexGrid = new HexGrid(0);
      const invalidCoords = [
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [0, -1],
        [1, -1]
      ];

      expect(() => {
        hexGrid.getTile(new Coord(0, 0));
      }).to.not.throw(Error, /out of bounds/);

      invalidCoords.forEach(([x, y]) => {
        expect(() => {
          hexGrid.getTile(new Coord(x, y));
        }).to.throw(Error, /out of bounds/);
      });
    });

    it("should have neighbors", () => {
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
        return hexGrid.getTile({x, y});
      });

      const neighbors = hexGrid.neighborsOf(new Coord(0, 0));

      expect(neighbors).to.deep.equal(expectedNeighbors);
    });

    it("on the edge should have a limited set of neighbors", () => {
      const hexGrid = new HexGrid(1);
      const expectedCoords = [
        [0, 0],
        [0, -1],
        [1, 0]
      ];
      const expectedNeighbors = expectedCoords.map(([x, y]) => {
        return hexGrid.getTile(new Coord(x, y));
      });

      const neighbors = hexGrid.neighborsOf(new Coord(1, -1));
      expect(neighbors.length).to.equal(expectedNeighbors.length);
      expect(neighbors).to.deep.include.members(expectedNeighbors);
    });
  });

  it("can calculate the position of a hex from its coordinates", () => {
    let errorMargin = 0.001;
    let pixelPos = HexGrid.coordToPixel(new Coord(0, 0), 10);
    expect(pixelPos).to.deep.equal({ x: 0, y: 0 });

    pixelPos = HexGrid.coordToPixel(new Coord(1, 0), 10);
    expect(pixelPos.x).to.be.closeTo(8.6603, errorMargin);
    expect(pixelPos.y).to.equal(15);

    pixelPos = HexGrid.coordToPixel(new Coord(0, 1), 10);
    expect(pixelPos.x).to.be.closeTo(17.3205, errorMargin);
    expect(pixelPos.y).to.equal(0);

    pixelPos = HexGrid.coordToPixel(new Coord(-1, 1), 10);
    expect(pixelPos.x).to.be.closeTo(8.66025, errorMargin);
    expect(pixelPos.y).to.equal(-15);

    pixelPos = HexGrid.coordToPixel(new Coord(1, -1), 10);
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
