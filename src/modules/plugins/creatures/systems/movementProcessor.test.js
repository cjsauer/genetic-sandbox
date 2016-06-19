import MovementProcessor from "./MovementProcessor";
import Brain from "../../creatures/components/Brain";
import World from "../../../ecs/World";
import HexGrid from "../../../grid/HexGrid";
import Coord from "../../core/components/Coord";
import Velocity from "../../core/components/Velocity";
import { buildDefaultCreature } from "../assembly";
import { expect } from "chai";
import { stub } from "sinon";

describe("MovementProcessor", () => {
  let sys, reserveStub, app, creature1, creature2;

  beforeEach(() => {
    const world = new World();
    const grid = new HexGrid(1);
    const random = {
      real: stub().returns(0)
    };

    creature1 = buildDefaultCreature(new Coord(0, 0), random);
    creature2 = buildDefaultCreature(new Coord(1, 0), random);
    world.addEntity(creature1);
    world.addEntity(creature2);
    world.update();

    app = { world, grid, random };

    sys = new MovementProcessor();
    reserveStub = stub(Brain, "reserveOutput").returns(0);
    sys.reserve(app);
    sys.initialize(app);
    reserveStub.restore();
  });

  it("should be tagged as 'processor'", () => {
    expect(sys.tag).to.equal("processor");
  });

  it("reserves 7 output neurons, one for each direction and one for no movement", () => {
    expect(reserveStub.callCount).to.equal(7);
  });

  it("maps each output neuron to a direction", () => {
    expect(sys._velocityFromIndex(0)).to.eql(new Velocity(0, 0));
    expect(sys._velocityFromIndex(1)).to.eql(new Velocity(1, 0));
    expect(sys._velocityFromIndex(2)).to.eql(new Velocity(0, 1));
    expect(sys._velocityFromIndex(3)).to.eql(new Velocity(-1, 1));
    expect(sys._velocityFromIndex(4)).to.eql(new Velocity(-1, 0));
    expect(sys._velocityFromIndex(5)).to.eql(new Velocity(0, -1));
    expect(sys._velocityFromIndex(6)).to.eql(new Velocity(1, -1));
  });

  it("can calculate the preferred direction of a creature", () => {
    const brain = creature1.getComponent("brain");
    stub(brain, "output");

    // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
    brain.output.onCall(0).returns(0.1);
    brain.output.onCall(1).returns(0.2);
    brain.output.onCall(2).returns(0.3);
    brain.output.onCall(3).returns(0.8);
    brain.output.onCall(4).returns(0.2);
    brain.output.onCall(5).returns(0.1);
    brain.output.onCall(6).returns(0.3);

    let dir = sys._calculatePreferredVelocity(brain);
    expect(dir).to.eql(new Velocity(-1, 1));

    // Signals no move
    brain.output.onCall(7).returns(0.9);
    brain.output.onCall(8).returns(0.2);
    brain.output.onCall(9).returns(0.3);
    brain.output.onCall(10).returns(0.7);
    brain.output.onCall(11).returns(0.2);
    brain.output.onCall(12).returns(0.1);
    brain.output.onCall(13).returns(0.3);

    dir = sys._calculatePreferredVelocity(brain);
    expect(dir).to.eql(new Velocity(0, 0));
  });

  describe("attempt", () => {
    it("sets creature velocity to the most prevailing direction signaled by the brain", () => {
      let brain = creature1.getComponent("brain");
      stub(brain, "output");

      // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
      brain.output.onCall(0).returns(0.1);
      brain.output.onCall(1).returns(0.2);
      brain.output.onCall(2).returns(0.3);
      brain.output.onCall(3).returns(0.8);
      brain.output.onCall(4).returns(0.2);
      brain.output.onCall(5).returns(0.1);
      brain.output.onCall(6).returns(0.3);

      brain = creature2.getComponent("brain");
      stub(brain, "output");

      // Signals no move attempt
      brain.output.onCall(0).returns(0.9);
      brain.output.onCall(1).returns(0.1);
      brain.output.onCall(2).returns(0.2);
      brain.output.onCall(3).returns(0.8);
      brain.output.onCall(4).returns(0.3);
      brain.output.onCall(5).returns(0.2);
      brain.output.onCall(6).returns(0.1);

      sys.attempt(app);

      expect(creature1.getComponent("velocity")).to.eql(new Velocity(-1, 1));
      expect(creature2.getComponent("velocity")).to.eql(new Velocity(0, 0));
    });

    it("chooses to do nothing in the event of a tie", () => {
      let brain = creature1.getComponent("brain");
      stub(brain, "output");

      // Conflicting signals
      brain.output.onCall(0).returns(0.3);
      brain.output.onCall(1).returns(0.9);
      brain.output.onCall(2).returns(0.7);
      brain.output.onCall(3).returns(0.2);
      brain.output.onCall(4).returns(0.9);
      brain.output.onCall(5).returns(0.1);
      brain.output.onCall(6).returns(0.3);

      brain = creature2.getComponent("brain");
      stub(brain, "output");

      // Conflicting signals
      brain.output.onCall(0).returns(0.3);
      brain.output.onCall(1).returns(0.2);
      brain.output.onCall(2).returns(0.7);
      brain.output.onCall(3).returns(0.9);
      brain.output.onCall(4).returns(0.2);
      brain.output.onCall(5).returns(0.1);
      brain.output.onCall(6).returns(0.9);

      sys.attempt(app);

      expect(creature1.getComponent("velocity")).to.eql(new Velocity(0, 0));
      expect(creature2.getComponent("velocity")).to.eql(new Velocity(0, 0));
    });
  });

  describe("update", () => {
    it("moves a creature according to its velocity", () => {
      let velocity1 = creature1.getComponent("velocity");
      velocity1.x = -1;
      velocity1.y = 1;

      let velocity2 = creature2.getComponent("velocity");
      velocity2.x = 0;
      velocity2.y = 0;

      // Assert intitial positions
      let coord1 = creature1.getComponent("coord");
      let coord2 = creature2.getComponent("coord");
      expect(coord1).to.eql(new Coord(0, 0));
      expect(coord2).to.eql(new Coord(1, 0));

      sys.update(app);

      // First creature moved
      expect(coord1).to.eql(new Coord(-1, 1));

      // Second creature did not
      expect(coord2).to.eql(new Coord(1, 0));
    });

    it("expends a creature's energy to move", () => {
      let velocity1 = creature1.getComponent("velocity");
      velocity1.x = -1;
      velocity1.y = 1;

      let velocity2 = creature2.getComponent("velocity");
      velocity2.x = 0;
      velocity2.y = 0;

      let energy1 = creature1.getComponent("energy");
      let energy2 = creature2.getComponent("energy");
      let originalEnergyLevel1 = energy1.level;
      let originalEnergyLevel2 = energy2.level;

      sys.update(app);

      expect(energy1.level).to.be.below(originalEnergyLevel1);
      expect(energy2.level).to.equal(originalEnergyLevel2);
    });

    it("does not allow a creature to move out of bounds", () => {
      // Signals a move from (1, 0) to (2, 0) which is out of bounds
      let velocity2 = creature2.getComponent("velocity");
      velocity2.x = 1;
      velocity2.y = 0;

      // Assert intitial position
      let coord2 = creature2.getComponent("coord");
      expect(coord2).to.eql(new Coord(1, 0));

      sys.update(app);

      // Did not move
      expect(coord2).to.eql(new Coord(1, 0));
    });

    it("does not allow a creature to move on top of another creature", () => {
      // Signals a move from (1, 0) to (0, 0) which is on top of the first creature
      let velocity2 = creature2.getComponent("velocity");
      velocity2.x = -1;
      velocity2.y = 0;

      // Assert intitial position
      let coord2 = creature2.getComponent("coord");
      expect(coord2).to.eql(new Coord(1, 0));

      sys.update(app);

      // Did not move
      expect(coord2).to.eql(new Coord(1, 0));
    });
  });
});
