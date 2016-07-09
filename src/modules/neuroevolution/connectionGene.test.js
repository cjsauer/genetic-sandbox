import ConnectionGene from "./ConnectionGene";
import Serializable from "../util/Serializable";
import { expect } from "chai";

describe("ConnectionGene", () => {
  it("is instantiable given in and out node IDs, weight, and enabled state", () => {
    let gene = new ConnectionGene(1, 2, 0.5, false);
    expect(gene).to.be.ok;
    expect(gene.in).to.equal(1);
    expect(gene.out).to.equal(2);
    expect(gene.weight).to.equal(0.5);
    expect(gene.enabled).to.equal(false);
  });

  it("should extend Serializable", () => {
    const gene = new ConnectionGene(1, 2);
    expect(gene instanceof Serializable).to.be.true;
  });

  it("should register its constructor with Serializable", () => {
    expect(Serializable._constructors["ConnectionGene"]).to.eql(ConnectionGene);
  });

  it("can be instantiated with zero arguments", () => {
    const emptyConnGene = new ConnectionGene();
    expect(emptyConnGene).to.be.ok;
  });

  it("can be cloned", () => {
    const gene = new ConnectionGene(1, 2, 0.5, true);
    let clone = gene.clone();
    expect(clone !== gene).to.be.true;
    expect(clone.in).to.equal(1);
    expect(clone.out).to.equal(2);
    expect(clone.weight).to.equal(0.5);
    expect(clone.enabled).to.be.true;

    gene.enabled = false;
    clone = gene.clone();
    expect(clone.enabled).to.be.false;
  });

  describe("innovation tracking", () => {
    beforeEach(() => {
      ConnectionGene.resetInnovations();
      ConnectionGene._nextInnovationNumber = 1;
    });

    it("stores a map of historic connection gene mutations", () => {
      const connectionGene1 = new ConnectionGene(1, 2, 0.5, true); // New innovation
      const connectionGene2 = new ConnectionGene(2, 3, 0.5, true); // New innovation
      const connectionGene3 = new ConnectionGene(1, 2, 0.5, true); // Repeat innovation
      const connectionGene4 = new ConnectionGene(3, 2, 0.5, true); // New innovation
      expect(connectionGene1.innovationNumber).to.equal(1);
      expect(connectionGene2.innovationNumber).to.equal(2);
      expect(connectionGene3.innovationNumber).to.equal(1);
      expect(connectionGene4.innovationNumber).to.equal(3);

      // Global innovation number should be incremented
      expect(ConnectionGene._nextInnovationNumber).to.equal(4);
    });

    it("can be reset", () => {
      const connectionGene1 = new ConnectionGene(1, 2, 0.5, true); // New innovation
      const connectionGene2 = new ConnectionGene(2, 3, 0.5, true); // New innovation
      expect(connectionGene1.innovationNumber).to.equal(1);
      expect(connectionGene2.innovationNumber).to.equal(2);

      ConnectionGene.resetInnovations();
      expect(ConnectionGene._innovationMap).to.eql({});
      expect(ConnectionGene._nextInnovationNumber).to.equal(1);

      // These innovations are "new" again, because the history was reset
      const connectionGene3 = new ConnectionGene(1, 2, 0.5, true); // New innovation
      const connectionGene4 = new ConnectionGene(2, 3, 0.5, true); // New innovation
      expect(connectionGene3.innovationNumber).to.equal(1);
      expect(connectionGene4.innovationNumber).to.equal(2);
      expect(ConnectionGene._nextInnovationNumber).to.equal(3);
    });
  });
});
