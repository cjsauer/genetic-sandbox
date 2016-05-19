import NodeGene from "../../../../../../src/modules/plugins/core/components/genetics/NodeGene";
import Component from "../../../../../../src/modules/plugins/Component";
import { expect } from "chai";

describe("NodeGene", () => {
  it("is instantiable given an ID and a type", () => {
    let gene = new NodeGene(1, "input");
    expect(gene).to.be.ok;
    expect(gene.id).to.equal(1);
    expect(gene.type).to.equal("input");

    gene = new NodeGene(1, "output");
    expect(gene).to.be.ok;
    expect(gene.id).to.equal(1);
    expect(gene.type).to.equal("output");

    gene = new NodeGene(1, "hidden");
    expect(gene).to.be.ok;
    expect(gene.id).to.equal(1);
    expect(gene.type).to.equal("hidden");
  });

  it("should extend Component", () => {
    const gene = new NodeGene(1, "input");
    expect(gene instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["NodeGene"]).to.eql(NodeGene);
  });

  it("can be instantiated with zero arguments", () => {
    const emptyNodeGene = new NodeGene();
    expect(emptyNodeGene).to.be.ok;
    expect(emptyNodeGene.id).to.equal(0);
    expect(emptyNodeGene.type).to.equal("hidden");
  });
});
