import TouchProcessor from "../../../../../src/modules/plugins/creatures/systems/TouchProcessor";
import Brain from "../../../../../src/modules/plugins/core/components/Brain";
import HexGrid from "../../../../../src/modules/grid/HexGrid";
import Coord from "../../../../../src/modules/plugins/core/components/Coord";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("TouchProcessor", () => {
  let app, creature1, creature2, plant, reserveStub;

  beforeEach(() => {
    const grid = new HexGrid(1);

    // Creature at (0, 0)
    creature1 = { brain: { input: stub() } };
    grid.getTile(new Coord(0, 0)).set("creature", creature1);
    // Creature at (1, 0)
    creature2 = { brain: { input: stub() } };
    grid.getTile(new Coord(1, 0)).set("creature", creature2);
    // Plant at (-1, 0)
    plant = {};
    grid.getTile(new Coord(-1, 0)).set("plant", plant);

    app = { grid };

    reserveStub = stub(Brain, "reserveInput").returns(0);
  });

  afterEach(() => {
    reserveStub.restore();
  });

  it("should be tagged as 'processor'", () => {
    const sys = new TouchProcessor();
    expect(sys.tag).to.equal("processor");
  });

  it("reserves 6 input neurons, one for each direction", () => {
    const sys = new TouchProcessor();
    sys.reserve();
    expect(reserveStub.callCount).to.equal(6);
  });

  it("inputs 6 values to the brain", () => {
    const sys = new TouchProcessor();
    const getSpy = spy(app.grid, "getTilesByComponent");
    sys.reserve(app);
    sys.sense(app);
    getSpy.restore();

    expect(getSpy.calledWith("creature")).to.be.true;
    expect(creature1.brain.input.getCall(0).args[1]).to.equal(0.5);
    expect(creature1.brain.input.getCall(1).args[1]).to.equal(0);
    expect(creature1.brain.input.getCall(2).args[1]).to.equal(0);
    expect(creature1.brain.input.getCall(3).args[1]).to.equal(1);
    expect(creature1.brain.input.getCall(4).args[1]).to.equal(0);
    expect(creature1.brain.input.getCall(5).args[1]).to.equal(0);

    expect(creature2.brain.input.getCall(0).args[1]).to.equal(0);
    expect(creature2.brain.input.getCall(1).args[1]).to.equal(0);
    expect(creature2.brain.input.getCall(2).args[1]).to.equal(0);
    expect(creature2.brain.input.getCall(3).args[1]).to.equal(0.5);
    expect(creature2.brain.input.getCall(4).args[1]).to.equal(0);
    expect(creature2.brain.input.getCall(5).args[1]).to.equal(0);
  });
});
