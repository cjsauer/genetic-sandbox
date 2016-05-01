import DefaultPlantRenderer from "../../../../src/modules/systems/renderers/DefaultPlantRenderer";
import Coord from "../../../../src/modules/grid/Coord";
import HexGrid from "../../../../src/modules/grid/HexGrid";
import { expect } from "chai";
import { stub } from "sinon";

describe("DefaultPlantRenderer", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new DefaultPlantRenderer();
    grid = new HexGrid(1);

    // Stub out the dependencies
    paper = {
      Path: {
        Line: stub().returns({
          rotate: stub()
        })
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
    it("should prebuild the plant graphic", () => {
      const { Group, Path, Symbol } = app.paper;
      sys.initialize(app);
      expect(Group.calledWithNew()).to.be.true;
      expect(Path.Line.calledWithNew()).to.be.true;
      expect(Symbol.calledWithNew()).to.be.true;
    });
  });

  describe("update", () => {
    it("should not be building any graphics", () => {
      const { Group, Path, Symbol } = app.paper;
      sys.update(app);
      expect(Group.calledWithNew()).to.be.false;
      expect(Path.Line.calledWithNew()).to.be.false;
      expect(Symbol.calledWithNew()).to.be.false;
    });

    it("should place a plant symbol for tiles with vegetation on their own layer", () => {
      const { Symbol, Layer } = app.paper;

      grid.getTile(new Coord(0, 0)).set("vegetation", true);
      grid.getTile(new Coord(1, 0)).set("vegetation", true);
      grid.getTile(new Coord(0, 1)).set("vegetation", true);

      sys.initialize(app);
      sys.update(app);
      expect(Symbol().place.callCount).to.equal(3);
      expect(Layer.calledWithNew()).to.be.true;
    });
  });
});
