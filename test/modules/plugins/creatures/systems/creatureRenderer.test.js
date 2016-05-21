import CreatureRenderer from "../../../../../src/modules/plugins/creatures/systems/CreatureRenderer";
import Coord from "../../../../../src/modules/plugins/core/components/Coord";
import HexGrid from "../../../../../src/modules/grid/HexGrid";
import { expect } from "chai";
import { stub } from "sinon";

describe("CreatureRenderer", () => {
  let sys, grid, paper, app;

  beforeEach(() => {
    sys = new CreatureRenderer();
    grid = new HexGrid(1);

    // Stub out the dependencies
    paper = {
      Path: {
        Circle: stub().returns({})
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
    it("should prebuild the creature graphic", () => {
      const { Path, Symbol } = app.paper;
      sys.initialize(app);
      expect(Path.Circle.calledWithNew()).to.be.true;
      expect(Symbol.calledWithNew()).to.be.true;
    });
  });

  describe("draw", () => {
    beforeEach(() => {
      sys.initialize(app);
      grid.getTile(new Coord(0, 0)).set("creature", {});
      grid.getTile(new Coord(1, 0)).set("creature", {});
      grid.getTile(new Coord(0, 1)).set("creature", {});
    });

    it("should place and store a creature symbol for tiles with a creature ONCE", () => {
      const { Symbol } = app.paper;
      sys.draw(app);
      expect(Symbol().place.callCount).to.equal(3);
      expect(() => { sys.draw(app); }).to.not.increase(Symbol().place, "callCount");
      grid.getTilesByComponent("creature").forEach((tile) => {
        let creature = tile.get("creature");
        expect(creature.hasOwnProperty("!graphic")).to.be.true;
      });
    });
  });
});
