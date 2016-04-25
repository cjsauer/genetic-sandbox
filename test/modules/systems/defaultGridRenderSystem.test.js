import DefaultGridRenderSystem from "../../../src/modules/systems/DefaultGridRenderSystem";
import Tile from "../../../src/modules/grid/Tile";
import chai from "chai";
const expect = chai.expect;
import { stub } from "sinon";

describe("DefaultGridRenderSystem", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new DefaultGridRenderSystem();

    // Stub out the dependencies required by DefaultGridRenderSystem
    grid = {
      getTiles: stub().returns([
        new Tile({ x: 0, y: 0 }),
        new Tile({ x: 1, y: 0 }),
        new Tile({ x: -1, y: 0 }),
        new Tile({ x: 0, y: 1 })
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
      sys.update(app);
      expect(paper.Symbol().place.callCount).to.equal(4);
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
