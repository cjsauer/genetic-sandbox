import Strand from "../../../../src/modules/components/genetics/Strand";
import Component from "../../../../src/modules/components/Component";
import { expect } from "chai";
import { stub } from "sinon";

describe("Strand", () => {
  let random;
  const isInputNodeGene = (gene) => gene.type === "input";
  const isOutputNodeGene = (gene) => gene.type === "output";
  const isHiddenNodeGene = (gene) => gene.type === "hidden";
  const isEnabled = (gene) => gene.enabled;
  const isDisabled = (gene) => !gene.enabled;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };
  });

  it("should extend Component", () => {
    const strand = new Strand(4, 6, true, random);
    expect(strand instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Strand"]).to.eql(Strand);
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
    expect(nodeGenes.filter(isInputNodeGene)).to.have.length(2);
    expect(nodeGenes.filter(isOutputNodeGene)).to.have.length(3);

    strand = new Strand(6, 4, true, random);
    nodeGenes = strand.nodeGenes;
    // 6 input neurons, 4 output neurons
    expect(nodeGenes).to.have.length(10);
    expect(nodeGenes.filter(isInputNodeGene)).to.have.length(6);
    expect(nodeGenes.filter(isOutputNodeGene)).to.have.length(4);
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
    let nodeGenes = strand.nodeGenes;
    expect(nodeGenes.filter(isHiddenNodeGene)).to.have.length(0);
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
});
