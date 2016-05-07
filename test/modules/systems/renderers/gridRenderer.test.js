import GridRenderer from "../../../../src/modules/systems/renderers/GridRenderer";
import HexGrid from "../../../../src/modules/grid/HexGrid";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("GridRenderer", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new GridRenderer();
    grid = new HexGrid(1);
    spy(grid, "getTiles");

    // Stub out the dependencies
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
        addChild: stub(),
        position: {}
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
    it("should fetch all tiles", () => {
      sys.initialize(app);
      expect(grid.getTiles.calledOnce).to.be.true;
    });

    it("should use a symbol to create a single hex path instance", () => {
      sys.initialize(app);
      expect(paper.Path.RegularPolygon.calledOnce).to.be.true;
      expect(paper.Symbol.calledWith(paper.Path.RegularPolygon())).to.be.true;
    });

    it("should place the symbol for each hex and add them to a group", () => {
      const coordSpy = spy(HexGrid, "coordToPixel");
      sys.initialize(app);
      coordSpy.restore();
      expect(paper.Group.calledWithNew()).to.be.true;
      app.grid.getTiles().forEach((tile) => {
        let coord = tile.get("coord");
        expect(coordSpy.calledWith(coord)).to.be.true;
      });
      expect(paper.Symbol().place.callCount).to.equal(grid.getTiles().length);
      expect(sys._hexGroup.addChild.callCount).to.equal(grid.getTiles().length);
    });

    it("should render the grid on a new layer", () => {
      sys.initialize(app);
      expect(paper.Layer.calledWithNew()).to.be.true;
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
  });
});
