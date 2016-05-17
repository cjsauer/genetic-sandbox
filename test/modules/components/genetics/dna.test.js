import DNA from "../../../../src/modules/components/genetics/DNA";
import Component from "../../../../src/modules/components/Component";
import { expect } from "chai";
import { stub } from "sinon";

describe("DNA", () => {
  let random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5),
      integer: stub().returns(0),
      pick: stub().returns({ enabled: false })
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
      expect(dna.brainStrand.nodeGenes).to.have.length(7);
      expect(dna.brainStrand.connectionGenes).to.have.length(12);

      expect(dna.traitStrand).to.be.ok;
      expect(dna.traitStrand.nodeGenes).to.have.length(2);
      expect(dna.traitStrand.connectionGenes).to.have.length(1);
    });

    it("should enable a single, random connection gene in the brain", () => {
      expect(random.pick().enabled).to.be.false;
      const dna = new DNA(5, 6, random); // eslint-disable-line
      expect(random.pick().enabled).to.be.true;
    });

    it("should contain a single, random Hox gene", () => {
      const dna = new DNA(2, 2, random);
      expect(dna._hoxGenes).to.have.length(1);
      expect(dna._hoxGenes[0]).to.equal(0.5);
    });
  });
});
