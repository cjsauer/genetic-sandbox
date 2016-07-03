import NodeGeneCollection from "./NodeGeneCollection";
import NodeGene from "./NodeGene";
import { expect } from "chai";

describe("NodeGeneCollection", () => {
  let collection, gene1, gene2;

  beforeEach(() => {
    collection = new NodeGeneCollection();
    gene1 = new NodeGene(1, "input");
    gene2 = new NodeGene(2, "output");
    collection.addGene(gene1);
    collection.addGene(gene2);
  });

  it("can return its length", () => {
    expect(collection.length).to.equal(2);
  });

  it("can return the count of each type of node gene", () => {
    const hiddenGene = new NodeGene(3, "hidden");
    collection.addGene(hiddenGene);
    expect(collection.inputNodeGeneCount).to.equal(1);
    expect(collection.outputNodeGeneCount).to.equal(1);
    expect(collection.hiddenNodeGeneCount).to.equal(1);
  });

  it("can add node genes", () => {
    const gene = new NodeGene(3, "hidden");
    collection.addGene(gene);
    expect(collection.genes).to.deep.include.members([gene, gene1, gene2]);
  });

  it("can access a node gene by id", () => {
    expect(collection.getGene(1)).to.eql(gene1);
    expect(collection.getGene(2)).to.eql(gene2);
    expect(collection.getGene(3)).to.be.null;
  });

  it("can remove a node gene by id", () => {
    expect(collection.genes).to.deep.include.members([gene1, gene2]);
    collection.removeGene(gene1.id);
    collection.removeGene(gene2.id);
    collection.removeGene(3); // Does nothing
    expect(collection.length).to.equal(0);
    expect(collection.getGene(1)).to.be.null;
    expect(collection.getGene(2)).to.be.null;
    expect(collection.contains(1)).to.be.false;
    expect(collection.contains(2)).to.be.false;
  });

  it("can test whether it contains a node gene with a given id", () => {
    expect(collection.contains(1)).to.be.true;
    expect(collection.contains(2)).to.be.true;
    expect(collection.contains(3)).to.be.false;
  });
});
