import MovementProcessor from "../../../../../src/modules/plugins/creatures/systems/MovementProcessor";
import Brain from "../../../../../src/modules/plugins/core/components/Brain";
import HexGrid from "../../../../../src/modules/grid/HexGrid";
import Coord from "../../../../../src/modules/plugins/core/components/Coord";
import config from "../../../../../src/modules/config";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("MovementProcessor", () => {
  let sys, reserveStub, app, creature1, creature2;

  beforeEach(() => {
    const grid = new HexGrid(1);

    // Creature at (0, 0)
    creature1 = { brain: { output: stub() }, expend: spy() };
    grid.getTile(new Coord(0, 0)).set("creature", creature1);
    // Creature at (1, 0)
    creature2 = { brain: { output: stub() }, expend: spy() };
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
      sys._movePlans["0,0"] = new Coord(-1, 1);

      // Signals no move attempt from (1, 0)
      sys._movePlans["1,0"] = new Coord(0, 0);

      // Assert intitial positions
      let tile = app.grid.getTile(new Coord(0, 0));
      expect(tile.get("creature")).to.eql(creature1);

      tile = app.grid.getTile(new Coord(1, 0));
      expect(tile.get("creature")).to.eql(creature2);

      sys.update(app);

      // First creature moved
      expect(app.grid.getTile(new Coord(0, 0)).hasComponent("creature")).to.be.false;
      tile = app.grid.getTile(new Coord(-1, 1));
      expect(tile.get("creature")).to.eql(creature1);

      // Second creature did not
      tile = app.grid.getTile(new Coord(1, 0));
      expect(tile.get("creature")).to.eql(creature2);
    });

    it("expends a creature's energy to move", () => {
      // Signals a move in the left and downward direction from (0, 0) to (-1, 1)
      sys._movePlans["0,0"] = new Coord(-1, 1);

      // Signals no move attempt from (1, 0)
      sys._movePlans["1,0"] = new Coord(0, 0);

      sys.update(app);

      expect(creature1.expend.calledWith(config.creatures.moveCost)).to.be.true;
      expect(creature2.expend.callCount).to.equal(0);
    });

    it("does not allow a creature to move out of bounds", () => {
      // Signals a move from (1, 0) to (2, 0) which is out of bounds
      sys._movePlans["1,0"] = new Coord(1, 0);

      // Assert intitial position
      let tile = app.grid.getTile(new Coord(0, 0));
      expect(tile.get("creature")).to.eql(creature1);

      sys.update(app);

      // Did not move
      tile = app.grid.getTile(new Coord(1, 0));
      expect(tile.hasComponent("creature")).to.be.true;
      expect(tile.get("creature")).to.eql(creature2);
    });

    it("does not allow a creature to move on top of another creature", () => {
      // Signals a move from (1, 0) to (0, 0) which is on top of the first creature
      sys._movePlans["1,0"] = new Coord(-1, 0);

      // Assert intitial position
      let tile = app.grid.getTile(new Coord(0, 0));
      expect(tile.get("creature")).to.eql(creature1);

      sys.update(app);

      // Did not move
      tile = app.grid.getTile(new Coord(1, 0));
      expect(tile.hasComponent("creature")).to.be.true;
      expect(tile.get("creature")).to.eql(creature2);
    });
  });

  it("can hash a Coord instance", () => {
    let coord = new Coord(2, 3);
    expect(sys._hashCoord(coord)).to.eql("2,3");
    coord = new Coord(5, 6);
    expect(sys._hashCoord(coord)).to.eql("5,6");
  });

  it("can unhash (restore) a hashed Coord instance", () => {
    let coord = new Coord(2, 3);
    expect(sys._unhashCoord(sys._hashCoord(coord))).to.eql(coord);
    coord = new Coord(2, 3);
    expect(sys._unhashCoord(sys._hashCoord(coord))).to.eql(coord);
  });
});
