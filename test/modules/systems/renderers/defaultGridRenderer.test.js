import DefaultGridRenderer from "../../../../src/modules/systems/renderers/DefaultGridRenderer";
import Tile from "../../../../src/modules/grid/Tile";
import Coord from "../../../../src/modules/grid/Coord";
import chai from "chai";
const expect = chai.expect;
import { stub, spy } from "sinon";

describe("DefaultGridRenderer", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new DefaultGridRenderer();

    // Stub out the dependencies required by DefaultGridRenderer
    grid = {
      getTiles: stub().returns([
        new Tile({ coord: new Coord(0, 0) }),
        new Tile({ coord: new Coord(1, 0) }),
        new Tile({ coord: new Coord(-1, 0) }),
        new Tile({ coord: new Coord(0, 1) }),
        new Tile({ coord: new Coord(0, -1) })
      ])
    };
    paper = {
      Path: {
        RegularPolygon: stub().returns({
          remove: stub()
        })
      },
      Symbol: stub().returns({
        place: stub().returns({
          position: {}
        })
      }),
      Point: stub().returns({
        add: stub()
      }),
      Color: stub(),
      view: {
        // Pretend the view is 800x600
        center: { x: 400, y: 300 }
      }
    };
    app = {
      grid,
      paper
    };
  });

  it("should be tagged as 'renderer'", () => {
    expect(sys.tag).to.equal("renderer");
  });

  describe("initialize", () => {
    it("should cache a reference to all tiles", () => {
      sys.initialize(app);
      expect(grid.getTiles.calledOnce).to.be.true;
    });

    it("should use a symbol to create a single Hexagon path instance", () => {
      sys.initialize(app);
      expect(paper.Path.RegularPolygon.calledOnce).to.be.true;
      expect(paper.Path.RegularPolygon().remove.calledOnce).to.be.true;
      expect(paper.Symbol.calledOnce).to.be.true;
    });
  });

  describe("update", () => {
    beforeEach(() => {
      sys.initialize(app);
    });

    it("should place the symbol for each hex", () => {
      let coordSpy = spy(sys, "_coordToPixel");
      sys.update(app);
      app.grid.getTiles().forEach((tile) => {
        let coord = tile.get("coord");
        expect(sys._coordToPixel.calledWith(coord.x, coord.y)).to.be.true;
      });
      expect(paper.Symbol().place.callCount).to.equal(5);
      coordSpy.restore();
    });

    it("should not call getTiles", () => {
      expect(app.grid.getTiles.callCount).to.equal(1);
    });
  });

  describe("private methods", () => {
    let errorMargin = 0.001;

    it("can calculate the position of a hex from its coordinates", () => {
      let pixelPos = sys._coordToPixel(0, 0, 10);
      expect(pixelPos).to.deep.equal({ x: 0, y: 0 });

      pixelPos = sys._coordToPixel(1, 0, 10);
      expect(pixelPos.x).to.be.closeTo(8.6603, errorMargin);
      expect(pixelPos.y).to.equal(15);

      pixelPos = sys._coordToPixel(0, 1, 10);
      expect(pixelPos.x).to.be.closeTo(17.3205, errorMargin);
      expect(pixelPos.y).to.equal(0);

      pixelPos = sys._coordToPixel(-1, 1, 10);
      expect(pixelPos.x).to.be.closeTo(8.66025, errorMargin);
      expect(pixelPos.y).to.equal(-15);

      pixelPos = sys._coordToPixel(1, -1, 10);
      expect(pixelPos.x).to.be.closeTo(-8.66025, errorMargin);
      expect(pixelPos.y).to.equal(15);
    });
  });
});
