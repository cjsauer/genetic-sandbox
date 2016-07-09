import Species from "./Species";
import { expect } from "chai";

describe("Species", () => {
  function compatibilityFunc(e1, e2) {
    return Math.abs(e1.value - e2.value) <= 1;
  }

  function fitnessFunc(e) {
    return e.value;
  }

  it("is constructed with a single representative entity", () => {
    const rep = { value: 10 };
    const species = new Species(rep);
    expect(species.representative).to.equal(rep);
    expect(species.entities).to.have.lengthOf(1);
  });

  it("can attempt to add potential candidates based on a compatibility function", () => {
    const rep = { value: 10 };
    const species = new Species(rep);
    const goodCandidate = { value: 11 };
    const badCandidate = { value: 2 };

    expect(species.addEntityIfCompatible(goodCandidate, compatibilityFunc)).to.be.true;
    expect(species.addEntityIfCompatible(badCandidate, compatibilityFunc)).to.be.false;

    expect(species.entities).to.have.lengthOf(2);
  });

  it("can average all of its entities' fitness scores", () => {
    const rep = { value: 10 };
    const species = new Species(rep);

    species.addEntityIfCompatible({ value: 11 }, compatibilityFunc);
    species.addEntityIfCompatible({ value: 11 }, compatibilityFunc);
    expect(species.fitness(fitnessFunc)).to.be.closeTo(10.666, 0.001);

    species.addEntityIfCompatible({ value: 9 }, compatibilityFunc);
    expect(species.fitness(fitnessFunc)).to.be.equal(10.25);

    species.clear();
    expect(species.fitness(fitnessFunc)).to.equal(0);
  });

  it("can clear its list of members", () => {
    const rep = { value: 10 };
    const species = new Species(rep);

    species.addEntityIfCompatible({ value: 10 }, compatibilityFunc);
    species.addEntityIfCompatible({ value: 10 }, compatibilityFunc);
    species.addEntityIfCompatible({ value: 10 }, compatibilityFunc);
    expect(species.entities).to.have.lengthOf(4);

    species.clear();
    expect(species.entities).to.have.lengthOf(0);
    expect(species.representative).to.eql(rep);
  });

  it("can decide whether it has become stagnant", () => {
    const rep = { value: 10 };
    const species = new Species(rep);

    // A species becomes stagnant if its max average fitness does not improve
    // after 3 calls to isStagnant()
    expect(species.isStagnant(3, fitnessFunc)).to.be.false;
    expect(species.isStagnant(3, fitnessFunc)).to.be.false;
    expect(species.isStagnant(3, fitnessFunc)).to.be.true;

    // Adding another entity will improve the fitness again
    species.addEntityIfCompatible({ value: 11 }, compatibilityFunc);
    expect(species.isStagnant(3, fitnessFunc)).to.be.false; // It improved!
    expect(species.isStagnant(3, fitnessFunc)).to.be.false;
    expect(species.isStagnant(3, fitnessFunc)).to.be.false;
    expect(species.isStagnant(3, fitnessFunc)).to.be.true;

    // This will NOT improve max fitness
    species.addEntityIfCompatible({ value: 9 }, compatibilityFunc);
    expect(species.isStagnant(3, fitnessFunc)).to.be.true;

    // We can up the stagnancy requirement too
    expect(species.isStagnant(6, fitnessFunc)).to.be.false;
    expect(species.isStagnant(6, fitnessFunc)).to.be.true;
  });

  it("can return the champion entity of this species", () => {
    const beastly = { value: 10 };
    const beastlier = { value: 10.5 };
    const beastliest = { value: 11 };
    const species = new Species(beastly);

    expect(species.champion(fitnessFunc)).to.eql(beastly);
    species.addEntityIfCompatible(beastlier, compatibilityFunc);
    expect(species.champion(fitnessFunc)).to.eql(beastlier);
    species.addEntityIfCompatible(beastliest, compatibilityFunc);
    expect(species.champion(fitnessFunc)).to.eql(beastliest);

    species.clear();
    expect(species.champion(fitnessFunc)).to.be.null;
  });
});
