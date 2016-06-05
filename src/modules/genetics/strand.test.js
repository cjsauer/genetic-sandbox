import Strand from "./Strand";
import Serializable from "../util/Serializable";
import { expect } from "chai";
import { stub } from "sinon";

describe("Strand", () => {
  let random;
  const isEnabled = (gene) => gene.enabled;
  const isDisabled = (gene) => !gene.enabled;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };
  });

  it("should extend Serializable", () => {
    const strand = new Strand(4, 6, true, random);
    expect(strand instanceof Serializable).to.be.true;
  });

  it("should register its constructor with Serializable", () => {
    expect(Serializable._constructors["Strand"]).to.eql(Strand);
  });

  it("can be instantiated with zero arguments", () => {
    const emptyStrand = new Strand();
    expect(emptyStrand).to.be.ok;
  });

  it("should be instantiated with the correct number of input/output node genes", () => {
    let strand = new Strand(2, 3, true, random);
    let nodeGenes = strand.nodeGenes;
    // 2 input neurons, 3 output neurons
    expect(nodeGenes).to.have.length(5);
    expect(strand.inputNodeGeneCount).to.equal(2);
    expect(strand.outputNodeGeneCount).to.equal(3);

    strand = new Strand(6, 4, true, random);
    nodeGenes = strand.nodeGenes;
    // 6 input neurons, 4 output neurons
    expect(nodeGenes).to.have.length(10);
    expect(strand.inputNodeGeneCount).to.equal(6);
    expect(strand.outputNodeGeneCount).to.equal(4);
  });

  it("should use sequential node gene IDs", () => {
    let strand = new Strand(2, 3, true, random);
    let nodeGenes = strand.nodeGenes;

    let id = 1;
    nodeGenes.forEach((gene) => {
      expect(gene.id).to.equal(id++);
    });
  });

  it("should be instantiated with zero hidden node genes", () => {
    let strand = new Strand(2, 3, true, random);
    expect(strand.hiddenNodeGeneCount).to.equal(0);
  });

  it("describes a fully connected neural network", () => {
    let strand = new Strand(2, 3, true, random);
    let connectionGenes = strand.connectionGenes;
    expect(connectionGenes).to.have.length(6);

    strand = new Strand(9, 7, true, random);
    connectionGenes = strand.connectionGenes;
    expect(connectionGenes).to.have.length(63);
  });

  it("is created with either all connection genes enabled, or all connection genes disabled", () => {
    let strand = new Strand(2, 3, false, random); // All disabled
    let connectionGenes = strand.connectionGenes;
    expect(connectionGenes.filter(isDisabled)).to.have.length(6);

    strand = new Strand(2, 3, true, random); // All enabled
    connectionGenes = strand.connectionGenes;
    expect(connectionGenes.filter(isEnabled)).to.have.length(6);
  });

  it("can count its input/output/hidden node genes", () => {
    let strand = new Strand(2, 3, true, random);
    expect(strand.inputNodeGeneCount).to.equal(2);
    expect(strand.outputNodeGeneCount).to.equal(3);
    expect(strand.hiddenNodeGeneCount).to.equal(0);
  });
});
