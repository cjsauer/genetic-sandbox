import DNA from "./DNA";
import Component from "../../../ecs/Component";
import { expect } from "chai";
import { stub } from "sinon";

describe("DNA", () => {
  let random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5),
      bool: stub().returns(true)
    };
  });

  it("should extend Component", () => {
    const dna = new DNA(3, 4, random);
    expect(dna instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["DNA"]).to.eql(DNA);
  });

  it("can be instantiated with zero arguments", () => {
    const emptyDNA = new DNA();
    expect(emptyDNA).to.be.ok;
  });

  describe("instantiation", () => {
    it("should build 2 strands of genes (brain strand and trait strand)", () => {
      const dna = new DNA(3, 4, random);

      expect(dna.brainStrand).to.be.ok;
      expect(dna.brainStrand.nodeGenes).to.have.lengthOf(7);
      expect(dna.brainStrand.connectionGenes).to.have.lengthOf(12);

      expect(dna.traitStrand).to.be.ok;
      expect(dna.traitStrand.nodeGenes).to.have.lengthOf(2);
      expect(dna.traitStrand.connectionGenes).to.have.lengthOf(1);
    });

    it("should contain a single, random Hox gene", () => {
      const dna = new DNA(2, 2, random);
      expect(dna._hoxGenes).to.have.lengthOf(1);
      expect(dna._hoxGenes[0]).to.equal(0.5);
    });
  });

  it("can be mutated", () => {
    const dna = new DNA(2, 2, random);
    stub(dna.brainStrand, "mutateWeights");
    stub(dna.brainStrand, "addRandomNodeGene");
    stub(dna.brainStrand, "addRandomConnectionGene");
    stub(dna.traitStrand, "mutateWeights");
    stub(dna.traitStrand, "addRandomNodeGene");
    stub(dna.traitStrand, "addRandomConnectionGene");

    dna.mutate(0.8, 0.03, 0.05, random);

    // These functions are tested separately, so we'll just make sure that they
    // were called
    expect(dna.brainStrand.mutateWeights.calledOnce).to.be.true;
    expect(dna.brainStrand.addRandomNodeGene.calledOnce).to.be.true;
    expect(dna.brainStrand.addRandomConnectionGene.calledOnce).to.be.true;
    expect(dna.traitStrand.mutateWeights.calledOnce).to.be.true;
    expect(dna.traitStrand.addRandomNodeGene.calledOnce).to.be.true;
    expect(dna.traitStrand.addRandomConnectionGene.calledOnce).to.be.true;
  });

  it("can compute the compatibility distance between two DNAs", () => {
    const dna1 = new DNA(2, 1, random);
    const dna2 = new DNA(2, 1, random);
    let originalDistance = dna1.compatibilityDistance(dna2, 1.0, 1.0, 1.0);

    // Identical DNA should have a compatibility distance of zero
    expect(originalDistance).to.equal(0);

    // Evolving strands differently should increase the distance
    dna1.brainStrand._splitConnectionWithNode(dna1.brainStrand.connectionGenes[0]);
    dna2.brainStrand._splitConnectionWithNode(dna2.brainStrand.connectionGenes[1]);
    let evolvedDistance = dna1.compatibilityDistance(dna2, 1.0, 1.0, 1.0);
    expect(evolvedDistance).to.be.above(originalDistance);

    // Mutating weights should increase the distance further
    dna1.traitStrand.connectionGenes[0].weight = 0.1;
    dna2.traitStrand.connectionGenes[0].weight = 0.9;
    let mutatedDistance = dna1.compatibilityDistance(dna2, 1.0, 1.0, 1.0);
    expect(mutatedDistance).to.be.above(evolvedDistance);
  });
});
