import Creature from "./Creature";
import Component from "../../../ecs/Component";
import DNA from "../../creatures/components/DNA";
import { expect } from "chai";
import { stub } from "sinon";

describe("Creature", () => {
  let creature, dna, random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };
    dna = new DNA(3, 4, random);
    creature = new Creature(dna);
  });

  it("should extend Component", () => {
    const creature = new Creature();
    expect(creature instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Creature"]).to.eql(Creature);
  });

  it("has DNA", () => {
    expect(creature.dna instanceof DNA).to.be.true;
  });
});
