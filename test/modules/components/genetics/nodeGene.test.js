import NodeGene from "../../../../src/modules/components/genetics/NodeGene";
import Component from "../../../../src/modules/components/Component";
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
});
