import ConnectionGeneCollection from "./ConnectionGeneCollection";
import ConnectionGene from "./ConnectionGene";
import { expect } from "chai";

describe("ConnectionGeneCollection", () => {
  let collection, gene1, gene2;

  beforeEach(() => {
    collection = new ConnectionGeneCollection();
    gene1 = new ConnectionGene(1, 2, 0.5, true);
    gene2 = new ConnectionGene(1, 3, 0.25, false);
    collection.addGene(gene1);
    collection.addGene(gene2);
  });

  afterEach(() => {
    ConnectionGene.resetInnovations();
  });

  it("can return its length", () => {
    expect(collection.length).to.equal(2);
  });

  it("can add connection genes", () => {
    const gene = new ConnectionGene(4, 4, 0.7, true);
    collection.addGene(gene);
    expect(collection.length).to.equal(3);
    expect(collection.genes).to.deep.include.members([gene, gene1, gene2]);
  });

  it("can access a connection gene by innovation number", () => {
    expect(collection.getGene(1)).to.eql(gene1);
    expect(collection.getGene(2)).to.eql(gene2);
    expect(collection.getGene(3)).to.be.null;
  });

  it("can remove a connection gene by innovation number", () => {
    expect(collection.genes).to.deep.include.members([gene1, gene2]);
    collection.removeGene(gene1.innovationNumber);
    collection.removeGene(gene2.innovationNumber);
    collection.removeGene(3); // Does nothing
    expect(collection.length).to.equal(0);
    expect(collection.getGene(1)).to.be.null;
    expect(collection.getGene(2)).to.be.null;
    expect(collection.contains(1)).to.be.false;
    expect(collection.contains(2)).to.be.false;
  });

  it("can test whether it contains a connection gene with a given innovation number", () => {
    expect(collection.contains(1)).to.be.true;
    expect(collection.contains(2)).to.be.true;
    expect(collection.contains(3)).to.be.false;
  });
});
