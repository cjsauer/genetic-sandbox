import PlantRenderer from "../../../../../src/modules/plugins/plants/systems/PlantRenderer";
import Coord from "../../../../../src/modules/plugins/core/components/Coord";
import HexGrid from "../../../../../src/modules/grid/HexGrid";
import { expect } from "chai";
import { stub } from "sinon";

describe("PlantRenderer", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new PlantRenderer();
    grid = new HexGrid(1);

    // Stub out the dependencies
    paper = {
      Path: {
        Line: stub().returns({
          rotate: stub()
        })
      },
      Symbol: stub().returns({
        place: stub().returns({
          remove: stub()
        })
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

  describe("draw", () => {
    beforeEach(() => {
      sys.initialize(app);
      grid.getTile(new Coord(0, 0)).set("plant", {});
      grid.getTile(new Coord(1, 0)).set("plant", {});
      grid.getTile(new Coord(0, 1)).set("plant", {});
    });

    it("should place and store a plant symbol for tiles with vegetation ONCE", () => {
      const { Symbol } = app.paper;
      sys.draw(app);
      expect(Symbol().place.callCount).to.equal(3);
      expect(() => { sys.draw(app); }).to.not.increase(Symbol().place, "callCount");
      grid.getTilesByComponent("plant").forEach((tile) => {
        let plant = tile.get("plant");
        expect(plant.hasOwnProperty("!graphic")).to.be.true;
      });
    });
  });
});
