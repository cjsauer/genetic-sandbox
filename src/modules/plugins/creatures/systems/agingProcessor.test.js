import AgingProcessor from "./AgingProcessor";
import HexGrid from "../../../grid/HexGrid";
import Coord from "../../core/components/Coord";
import config from "../../../config";
import { expect } from "chai";
import { spy } from "sinon";

describe("EatingProcessor", () => {
  let sys, app, creature;

  beforeEach(() => {
    const grid = new HexGrid(1);

    // Creature at (0, 0)
    creature = { expend: spy() };
    grid.getTile(new Coord(0, 0)).set("creature", creature);

    app = { grid };

    sys = new AgingProcessor();
  });

  it("should be tagged as 'processor'", () => {
    expect(sys.tag).to.equal("processor");
  });

  describe("update", () => {
    it("should age creatures by the configured energy amount", () => {
      creature.alive = true;
      sys.update(app);
      expect(creature.expend.calledWith(config.creatures.tickCost)).to.be.true;
    });

    it("should destroy dead creatures", () => {
      creature.alive = false;
      sys.update(app);
      expect(app.grid.getTile(new Coord(0, 0)).hasComponent("creature")).to.be.false;
    });
  });
});
