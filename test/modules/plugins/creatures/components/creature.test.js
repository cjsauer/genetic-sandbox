import Creature from "../../../../../src/modules/plugins/creatures/components/Creature";
import Component from "../../../../../src/modules/plugins/Component";
import Brain from "../../../../../src/modules/plugins/core/components/Brain";
import DNA from "../../../../../src/modules/plugins/core/components/genetics/DNA";
import Plant from "../../../../../src/modules/plugins/plants/components/Plant";
import { expect } from "chai";
import { stub } from "sinon";

describe("Creature", () => {
  let creature, dna, random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5),
      pick: stub().returns({ enabled: true })
    };
    dna = new DNA(3, 4, random);
    creature = new Creature(dna, 50);
  });

  it("should extend Component", () => {
    const creature = new Creature();
    expect(creature instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Creature"]).to.eql(Creature);
  });

  it("has DNA, a brain, and energy", () => {
    expect(creature.energy).to.equal(50);
    expect(creature.brain instanceof Brain).to.be.true;
    expect(creature.dna instanceof DNA).to.be.true;
  });

  it("can eat plants", () => {
    const plant = new Plant(10);
    expect(creature.energy).to.equal(50);
    expect(creature.eat(plant)).to.equal(60);
  });

  it("can expend energy", () => {
    expect(creature.expend(20)).to.be.true; // Not dead yet
    expect(creature.energy).to.equal(30);
    expect(creature.alive).to.be.true;

    expect(creature.expend(30)).to.be.false; // All energy depleted
    expect(creature.energy).to.equal(0);
    expect(creature.alive).to.be.false;
  });

  it("can die", () => {
    expect(creature.alive).to.be.true;
    creature.die();
    expect(creature.energy).to.equal(0);
    expect(creature.alive).to.be.false;

    const deadCreature = new Creature(dna, 0);
    expect(deadCreature.alive).to.be.false;
  });
});
