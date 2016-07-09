import NodeGene from "./NodeGene";
import Serializable from "../util/Serializable";
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

  it("should extend Serializable", () => {
    const gene = new NodeGene(1, "input");
    expect(gene instanceof Serializable).to.be.true;
  });

  it("should register its constructor with Serializable", () => {
    expect(Serializable._constructors["NodeGene"]).to.eql(NodeGene);
  });

  it("can be instantiated with zero arguments", () => {
    const emptyNodeGene = new NodeGene();
    expect(emptyNodeGene).to.be.ok;
    expect(emptyNodeGene.id).to.equal(0);
    expect(emptyNodeGene.type).to.equal("hidden");
  });

  it("can be cloned", () => {
    const gene = new NodeGene(1, "input");
    const gene2 = new NodeGene(2, "output");
    const clone = gene.clone();
    const clone2 = gene2.clone();

    expect(clone.id).to.equal(1);
    expect(clone.type).to.equal("input");
    expect(clone2.id).to.equal(2);
    expect(clone2.type).to.equal("output");
  });
});
