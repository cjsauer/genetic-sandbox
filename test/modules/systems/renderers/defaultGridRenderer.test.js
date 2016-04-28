import DefaultGridRenderer from "../../../../src/modules/systems/renderers/DefaultGridRenderer";
import Tile from "../../../../src/modules/grid/Tile";
import Coord from "../../../../src/modules/grid/Coord";
import { expect } from "chai";
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
        RegularPolygon: stub().returns({})
      },
      Symbol: stub().returns({
        place: stub().returns({})
      }),
      Point: stub().returns({
        add: stub()
      }),
      Color: stub(),
      Group: stub().returns({
        addChild: stub()
      }),
      Layer: stub().returns({
        addChild: stub()
      }),
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

    it("should use a symbol to create a single hex path instance", () => {
      sys.initialize(app);
      expect(paper.Path.RegularPolygon.calledOnce).to.be.true;
      expect(paper.Symbol.calledOnce).to.be.true;
    });

    it("should place the symbol for each hex and add them to a group", () => {
      const coordSpy = spy(sys, "_coordToPixel");
      sys.initialize(app);
      coordSpy.restore();
      expect(paper.Group.calledWithNew()).to.be.true;
      app.grid.getTiles().forEach((tile) => {
        let coord = tile.get("coord");
        expect(coordSpy.calledWith(coord.x, coord.y)).to.be.true;
      });
      expect(paper.Symbol().place.callCount).to.equal(grid.getTiles().length);
      expect(sys._hexGroup.addChild.callCount).to.equal(grid.getTiles().length);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      sys.initialize(app);
    });

    it("should not call getTiles", () => {
      sys.update(app);
      sys.update(app);
      sys.update(app);
      expect(app.grid.getTiles.callCount).to.equal(1); // 1 call by initialize
    });

    it("should render the grid on a new layer", () => {
      sys.update(app);
      expect(paper.Layer.calledWithNew()).to.be.true;
      expect(paper.Layer().addChild.calledWith(sys._hexGroup)).to.be.true;
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
