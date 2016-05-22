import MovementProcessor from "../../../../../src/modules/plugins/creatures/systems/MovementProcessor";
import Brain from "../../../../../src/modules/plugins/core/components/Brain";
import HexGrid from "../../../../../src/modules/grid/HexGrid";
import Coord from "../../../../../src/modules/plugins/core/components/Coord";
import { expect } from "chai";
import { stub } from "sinon";

describe("MovementProcessor", () => {
  let sys, reserveStub, app, creature1, creature2;

  beforeEach(() => {
    const grid = new HexGrid(1);

    // Creature at (0, 0)
    creature1 = { brain: { output: stub() } };
    grid.getTile(new Coord(0, 0)).set("creature", creature1);
    // Creature at (1, 0)
    creature2 = { brain: { output: stub() } };
    grid.getTile(new Coord(1, 0)).set("creature", creature2);

    app = { grid };

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
    expect(sys._directionFromIndex(0)).to.eql(new Coord(0, 0));
    expect(sys._directionFromIndex(1)).to.eql(new Coord(1, 0));
    expect(sys._directionFromIndex(2)).to.eql(new Coord(0, 1));
    expect(sys._directionFromIndex(3)).to.eql(new Coord(-1, 1));
    expect(sys._directionFromIndex(4)).to.eql(new Coord(-1, 0));
    expect(sys._directionFromIndex(5)).to.eql(new Coord(0, -1));
    expect(sys._directionFromIndex(6)).to.eql(new Coord(1, -1));
  });

  it("can calculate the preferred direction of a creature", () => {
    // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
    creature1.brain.output.onCall(0).returns(0.1);
    creature1.brain.output.onCall(1).returns(0.2);
    creature1.brain.output.onCall(2).returns(0.3);
    creature1.brain.output.onCall(3).returns(0.8);
    creature1.brain.output.onCall(4).returns(0.2);
    creature1.brain.output.onCall(5).returns(0.1);
    creature1.brain.output.onCall(6).returns(0.3);
    const dir = sys._calculatePreferredDirection(creature1);
    expect(dir).to.eql(new Coord(-1, 1));
  });

  describe("attempt", () => {
    it("plans to move a creature in the most prevailing direction signaled by the brain", () => {
      // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
      creature1.brain.output.onCall(0).returns(0.1);
      creature1.brain.output.onCall(1).returns(0.2);
      creature1.brain.output.onCall(2).returns(0.3);
      creature1.brain.output.onCall(3).returns(0.8);
      creature1.brain.output.onCall(4).returns(0.2);
      creature1.brain.output.onCall(5).returns(0.1);
      creature1.brain.output.onCall(6).returns(0.3);

      // Signals no move attempt
      creature2.brain.output.onCall(0).returns(0.9);
      creature2.brain.output.onCall(1).returns(0.1);
      creature2.brain.output.onCall(2).returns(0.2);
      creature2.brain.output.onCall(3).returns(0.8);
      creature2.brain.output.onCall(4).returns(0.3);
      creature2.brain.output.onCall(5).returns(0.2);
      creature2.brain.output.onCall(6).returns(0.1);

      sys.attempt(app);

      expect(sys._movePlans).to.eql({
        "0,0": new Coord(-1, 1),
        "1,0": new Coord(0, 0)
      });
    });

    it("chooses to do nothing in the event of a tie", () => {
      // Signals a move to the right and to the left, resulting in a tie
      creature1.brain.output.onCall(0).returns(0.3);
      creature1.brain.output.onCall(1).returns(0.9);
      creature1.brain.output.onCall(2).returns(0.7);
      creature1.brain.output.onCall(3).returns(0.2);
      creature1.brain.output.onCall(4).returns(0.9);
      creature1.brain.output.onCall(5).returns(0.1);
      creature1.brain.output.onCall(6).returns(0.3);

      // Signals a move to top right and to the bottom left, resulting in a tie
      creature2.brain.output.onCall(0).returns(0.3);
      creature2.brain.output.onCall(1).returns(0.2);
      creature2.brain.output.onCall(2).returns(0.7);
      creature2.brain.output.onCall(3).returns(0.9);
      creature2.brain.output.onCall(4).returns(0.2);
      creature2.brain.output.onCall(5).returns(0.1);
      creature2.brain.output.onCall(6).returns(0.9);

      sys.attempt(app);

      expect(sys._movePlans).to.eql({
        "0,0": new Coord(0, 0),
        "1,0": new Coord(0, 0)
      });
    });
  });

  describe("update", () => {
    it("moves a creature to its planned tile", () => {
      // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
      creature1.brain.output.onCall(0).returns(0.1);
      creature1.brain.output.onCall(1).returns(0.2);
      creature1.brain.output.onCall(2).returns(0.3);
      creature1.brain.output.onCall(3).returns(0.8);
      creature1.brain.output.onCall(4).returns(0.2);
      creature1.brain.output.onCall(5).returns(0.1);
      creature1.brain.output.onCall(6).returns(0.3);

      // Signals no move attempt
      creature2.brain.output.onCall(0).returns(0.9);
      creature2.brain.output.onCall(1).returns(0.1);
      creature2.brain.output.onCall(2).returns(0.2);
      creature2.brain.output.onCall(3).returns(0.3);
      creature2.brain.output.onCall(4).returns(0.8);
      creature2.brain.output.onCall(5).returns(0.2);
      creature2.brain.output.onCall(6).returns(0.1);

      sys.attempt(app);
      sys.update(app);

      // First creature moved
      expect(app.grid.getTile(new Coord(0, 0)).hasComponent("creature")).to.be.false;
      expect(app.grid.getTile(new Coord(-1, 1)).hasComponent("creature")).to.be.true;

      // Second creature did not
      expect(app.grid.getTile(new Coord(1, 0)).hasComponent("creature")).to.be.true;
    });

    it("does not allow a creature to move out of bounds", () => {
      // Signals a move to (2, 0) which is out of bounds
      creature2.brain.output.onCall(1).returns(0.2);
      creature2.brain.output.onCall(0).returns(0.9);
      creature2.brain.output.onCall(2).returns(0.7);
      creature2.brain.output.onCall(3).returns(0.3);
      creature2.brain.output.onCall(4).returns(0.2);
      creature2.brain.output.onCall(5).returns(0.1);
      creature2.brain.output.onCall(6).returns(0.3);

      sys.attempt(app);
      sys.update(app);

      // Did not move
      expect(app.grid.getTile(new Coord(1, 0)).hasComponent("creature")).to.be.true;
    });

    it("does not allow a creature to move on top of another creature", () => {
      // Signals a move to (0, 0) which is on top of the first creature
      creature2.brain.output.onCall(0).returns(0.3);
      creature2.brain.output.onCall(1).returns(0.2);
      creature2.brain.output.onCall(2).returns(0.7);
      creature2.brain.output.onCall(3).returns(0.2);
      creature2.brain.output.onCall(4).returns(0.9);
      creature2.brain.output.onCall(5).returns(0.1);
      creature2.brain.output.onCall(6).returns(0.3);

      sys.attempt(app);
      sys.update(app);

      // Did not move
      expect(app.grid.getTile(new Coord(1, 0)).hasComponent("creature")).to.be.true;
    });
  });
});
