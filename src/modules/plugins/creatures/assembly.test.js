import { buildCreature, buildDefaultCreature } from "./assembly";
import DNA from "./components/DNA";
import Brain from "./components/Brain";
import Coord from "../core/components/Coord";
import { expect } from "chai";
import { stub } from "sinon";

describe("Creature assembly", () => {
  let random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };
  });

  it("can build creature entities from DNA", () => {
    let dna = new DNA(2, 3, random);
    let coord = new Coord(0, 0);
    let creature = buildCreature(dna, coord);
    expect(creature.hasComponent("creature")).to.be.true;
    expect(creature.hasComponent("brain")).to.be.true;
    expect(creature.hasComponent("dna")).to.be.true;
    expect(creature.getComponent("dna")).to.eql(dna);
    expect(creature.hasComponent("sprite")).to.be.true;
    expect(creature.hasComponent("coord")).to.be.true;
    expect(creature.getComponent("coord")).to.eql(coord);
  });

  it("can build the default creature", () => {
    Brain.reserveInput();
    Brain.reserveInput();
    Brain.reserveInput();
    Brain.reserveOutput();
    Brain.reserveOutput();

    let coord = new Coord(0, 0);
    let creature = buildDefaultCreature(coord, random);
    let dna = creature.getComponent("dna");

    expect(creature.hasComponent("creature")).to.be.true;
    expect(creature.hasComponent("brain")).to.be.true;
    expect(creature.hasComponent("sprite")).to.be.true;
    expect(creature.hasComponent("coord")).to.be.true;
    expect(creature.getComponent("coord")).to.eql(coord);
    expect(dna.brainStrand.inputNodeGeneCount).to.equal(3);
    expect(dna.brainStrand.outputNodeGeneCount).to.equal(2);
  });
});
