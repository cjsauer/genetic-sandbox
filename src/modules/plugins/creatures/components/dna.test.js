import DNA from "./DNA";
import Component from "../../../ecs/Component";
import { expect } from "chai";
import { stub } from "sinon";

describe("DNA", () => {
  let random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
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
});
