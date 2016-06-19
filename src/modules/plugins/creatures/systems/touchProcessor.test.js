import TouchProcessor from "./TouchProcessor";
import Brain from "../../creatures/components/Brain";
import World from "../../../ecs/World";
import HexGrid from "../../../grid/HexGrid";
import Coord from "../../core/components/Coord";
import { buildDefaultCreature } from "../assembly";
import { buildPlant } from "../../plants/assembly";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("TouchProcessor", () => {
  let app, creature1, creature2, plant, reserveStub;

  beforeEach(() => {
    const world = new World();
    const grid = new HexGrid(1);
    const random = {
      real: stub().returns(0)
    };

    creature1 = buildDefaultCreature(new Coord(0, 0), random);
    creature2 = buildDefaultCreature(new Coord(1, 0), random);
    plant = buildPlant(10, new Coord(-1, 0));

    world.addEntity(creature1);
    world.addEntity(creature2);
    world.addEntity(plant);

    app = { world, grid, random };

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
    const brain1 = creature1.getComponent("brain");
    const brain2 = creature2.getComponent("brain");
    spy(brain1, "input");
    spy(brain2, "input");

    sys.reserve(app);
    sys.sense(app);

    expect(brain1.input.getCall(0).args[1]).to.equal(0.5);
    expect(brain1.input.getCall(1).args[1]).to.equal(0);
    expect(brain1.input.getCall(2).args[1]).to.equal(0);
    expect(brain1.input.getCall(3).args[1]).to.equal(1);
    expect(brain1.input.getCall(4).args[1]).to.equal(0);
    expect(brain1.input.getCall(5).args[1]).to.equal(0);

    expect(brain2.input.getCall(0).args[1]).to.equal(0);
    expect(brain2.input.getCall(1).args[1]).to.equal(0);
    expect(brain2.input.getCall(2).args[1]).to.equal(0);
    expect(brain2.input.getCall(3).args[1]).to.equal(0.5);
    expect(brain2.input.getCall(4).args[1]).to.equal(0);
    expect(brain2.input.getCall(5).args[1]).to.equal(0);
  });
});
