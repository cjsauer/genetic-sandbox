import Strand from "./Strand";
import ConnectionGene from "./ConnectionGene";
import Serializable from "../util/Serializable";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("Strand", () => {
  let random;
  const isEnabled = (gene) => gene.enabled;
  const isDisabled = (gene) => !gene.enabled;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };

    // Completely reset innovations each test for the sake of ease
    ConnectionGene.resetInnovations();
    ConnectionGene._nextInnovationNumber = 1;
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
    expect(nodeGenes).to.have.lengthOf(5);
    expect(strand.inputNodeGeneCount).to.equal(2);
    expect(strand.outputNodeGeneCount).to.equal(3);

    strand = new Strand(6, 4, true, random);
    nodeGenes = strand.nodeGenes;
    // 6 input neurons, 4 output neurons
    expect(nodeGenes).to.have.lengthOf(10);
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
    expect(connectionGenes).to.have.lengthOf(6);

    strand = new Strand(9, 7, true, random);
    connectionGenes = strand.connectionGenes;
    expect(connectionGenes).to.have.lengthOf(63);
  });

  it("is created with either all connection genes enabled, or all connection genes disabled", () => {
    let strand = new Strand(2, 3, false, random); // All disabled
    let connectionGenes = strand.connectionGenes;
    expect(connectionGenes.filter(isDisabled)).to.have.lengthOf(6);

    strand = new Strand(2, 3, true, random); // All enabled
    connectionGenes = strand.connectionGenes;
    expect(connectionGenes.filter(isEnabled)).to.have.lengthOf(6);
  });

  it("can count its input/output/hidden node genes", () => {
    let strand = new Strand(2, 3, true, random);
    expect(strand.inputNodeGeneCount).to.equal(2);
    expect(strand.outputNodeGeneCount).to.equal(3);
    expect(strand.hiddenNodeGeneCount).to.equal(0);
  });

  it("can determine if two node genes are already connected", () => {
    let strand = new Strand(2, 1, true, random);
    strand._splitConnectionWithNode(strand.connectionGenes[0]);
    let nodeGenes = strand.nodeGenes;

    expect(strand._areConnected(nodeGenes[0], nodeGenes[3])).to.be.true;
    expect(strand._areConnected(nodeGenes[3], nodeGenes[2])).to.be.true;
    expect(strand._areConnected(nodeGenes[1], nodeGenes[2])).to.be.true;
    expect(strand._areConnected(nodeGenes[0], nodeGenes[1])).to.be.false;
    expect(strand._areConnected(nodeGenes[1], nodeGenes[3])).to.be.false;
    expect(strand._areConnected(nodeGenes[3], nodeGenes[1])).to.be.false;
    expect(strand._areConnected(nodeGenes[2], nodeGenes[1])).to.be.false;
  });

  it("can determine if two node genes could potentially be connected", () => {
    let strand = new Strand(2, 1, true, random);
    strand._splitConnectionWithNode(strand.connectionGenes[0]);

    // A valid connection
    expect(strand._canConnect(strand.nodeGenes[1], strand.nodeGenes[3])).to.be.true;

    // Cannot use an input node as a destination
    expect(strand._canConnect(strand.nodeGenes[1], strand.nodeGenes[0])).to.be.false;
    expect(strand._canConnect(strand.nodeGenes[0], strand.nodeGenes[1])).to.be.false;

    // Cannot use an output node as a source
    expect(strand._canConnect(strand.nodeGenes[2], strand.nodeGenes[3])).to.be.false;

    // Cannot connect two nodes that are already connected
    expect(strand._canConnect(strand.nodeGenes[0], strand.nodeGenes[3])).to.be.false;
    expect(strand._canConnect(strand.nodeGenes[1], strand.nodeGenes[2])).to.be.false;
    expect(strand._canConnect(strand.nodeGenes[3], strand.nodeGenes[2])).to.be.false;
  });

  it("can be cloned", () => {
    let strand = new Strand(2, 1, true, random);
    let clone = strand.clone();
    expect(strand.connectionGenes).to.eql(clone.connectionGenes);
    expect(strand.nodeGenes).to.eql(clone.nodeGenes);
    expect(strand._nextNodeGeneID).to.equal(clone._nextNodeGeneID);
  });

  describe("mutation", () => {
    it("can randomly change its connection weights", () => {
      let strand = new Strand(2, 1, true, random);

      // Force the random chance of each mutation to alternate
      random.real.returns(0.1);
      random.bool = stub();
      random.bool.withArgs(0.1)
      .onFirstCall().returns(true) // Will perturb first weight...
      .onSecondCall().returns(false); // but not second
      random.bool.withArgs(0.2)
      .onFirstCall().returns(false) // Will NOT replace first weight...
      .onSecondCall().returns(true); // but will replace second
      random.bool.returns(false);

      strand.mutateWeights(0.1, 0.05, 0.2, random);

      let weights = strand.connectionGenes.map((gene) => gene.weight);
      expect(weights[0]).to.equal(0.495);
      expect(weights[1]).to.equal(0.1);
    });

    it("can split a given connection gene with a node gene, preserving behavior", () => {
      let strand = new Strand(2, 1, true, random);
      let originalConnectionGeneCount = strand.connectionGenes.length;
      let connectionGene = strand.connectionGenes[0];

      strand._splitConnectionWithNode(connectionGene);

      let incomingConnection = strand.connectionGenes[originalConnectionGeneCount];
      let outgoingConnection = strand.connectionGenes[originalConnectionGeneCount + 1];
      expect(connectionGene.enabled).to.be.false;
      expect(strand.connectionGenes.length).to.equal(originalConnectionGeneCount + 2);
      expect(incomingConnection.weight).to.equal(1);
      expect(outgoingConnection.weight).to.equal(connectionGene.weight);
    });

    it("can split a random connection with a node gene, preserving behavior", () => {
      let strand = new Strand(2, 1, true, random);
      let originalNodeGeneCount = strand.nodeGenes.length;
      spy(strand, "_splitConnectionWithNode");
      random.pick = stub().returns(strand.connectionGenes[0]);

      strand.addRandomNodeGene(random);
      expect(strand.nodeGenes).to.have.lengthOf(originalNodeGeneCount + 1);
      expect(strand._splitConnectionWithNode.calledWith(strand.connectionGenes[0])).to.be.true;
    });

    it("can connect two given nodes", () => {
      let strand = new Strand(1, 2, true, random);
      strand._splitConnectionWithNode(strand.connectionGenes[0]);
      let originalConnectionGeneCount = strand.connectionGenes.length;
      let nodeGenes = strand.nodeGenes;

      // Valid connection
      let connection = strand._connect(nodeGenes[3], nodeGenes[2], random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      // Recurrent connection
      connection = strand._connect(nodeGenes[3], nodeGenes[3], random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      // Invalid connection
      connection = strand._connect(nodeGenes[0], nodeGenes[3], random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount);
      expect(connection).to.be.null;
    });

    it("can randomly add a new connection between two nodes", () => {
      let strand = new Strand(1, 2, true, random);
      strand._splitConnectionWithNode(strand.connectionGenes[0]);
      let originalConnectionGeneCount = strand.connectionGenes.length;
      random.pick = stub();

      // Test a normal connection
      random.pick.onCall(0).returns(strand.nodeGenes[3]);
      random.pick.onCall(1).returns(strand.nodeGenes[2]);

      // Test a recurrent connection
      random.pick.onCall(2).returns(strand.nodeGenes[3]);
      random.pick.onCall(3).returns(strand.nodeGenes[3]);

      // Test the event of two appropriate nodes never being found
      random.pick.returns(strand.nodeGenes[0]);

      let connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connectionGenes).to.have.lengthOf(originalConnectionGeneCount);
      expect(connection).to.be.null;
    });
  });

  describe("speciation", () => {
    let strand1, strand2;

    beforeEach(() => {
      // Mimic some evolution of two strands using the two examples given on
      // page 12 of the NEAT pdf: http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
      strand1 = new Strand(3, 1, true, random);
      strand1._splitConnectionWithNode(strand1.connectionGenes[1]);
      strand2 = new Strand(3, 1, true, random);
      strand2._splitConnectionWithNode(strand2.connectionGenes[1]);
      strand2._splitConnectionWithNode(strand2.connectionGenes[4]);
      strand1._connect(strand1.nodeGenes[0], strand1.nodeGenes[4], random);
      strand2._connect(strand2.nodeGenes[2], strand2.nodeGenes[4], random);
      strand2._connect(strand2.nodeGenes[0], strand2.nodeGenes[5], random);
    });

    it("can determine matching genes between strands", () => {
      let matchingGenes = strand1._matching(strand2);
      expect(matchingGenes).to.have.lengthOf(5);
      expect(matchingGenes[0].innovationNumber).to.equal(1);
      expect(matchingGenes[1].innovationNumber).to.equal(2);
      expect(matchingGenes[2].innovationNumber).to.equal(3);
      expect(matchingGenes[3].innovationNumber).to.equal(4);
      expect(matchingGenes[4].innovationNumber).to.equal(5);

      matchingGenes = strand2._matching(strand1);
      expect(matchingGenes).to.have.lengthOf(5);
      expect(matchingGenes[0].innovationNumber).to.equal(1);
      expect(matchingGenes[1].innovationNumber).to.equal(2);
      expect(matchingGenes[2].innovationNumber).to.equal(3);
      expect(matchingGenes[3].innovationNumber).to.equal(4);
      expect(matchingGenes[4].innovationNumber).to.equal(5);
    });

    it("can determine disjoint genes between strands", () => {
      let disjointGenes = strand1._disjoint(strand2);
      expect(disjointGenes).to.have.lengthOf(1);
      expect(disjointGenes[0].innovationNumber).to.equal(8);

      disjointGenes = strand2._disjoint(strand1);
      expect(disjointGenes).to.have.lengthOf(2);
      expect(disjointGenes[0].innovationNumber).to.equal(6);
      expect(disjointGenes[1].innovationNumber).to.equal(7);
    });

    it("can determine excess genes between strands", () => {
      let excessGenes = strand1._excess(strand2);
      expect(excessGenes).to.have.lengthOf(0);

      excessGenes = strand2._excess(strand1);
      expect(excessGenes).to.have.lengthOf(2);
      expect(excessGenes[0].innovationNumber).to.equal(9);
      expect(excessGenes[1].innovationNumber).to.equal(10);
    });

    it("can compute the compatibility difference between two strands", () => {
      let distance = strand1.compatibilityDistance(strand2, 1.0, 1.0, 1.0);
      expect(distance).to.equal(5);
      distance = strand1.compatibilityDistance(strand2, 0.5, 1.0, 1.0);
      expect(distance).to.equal(4);
      distance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(distance).to.equal(2.5);

      // Moving weights farther apart should increase the compatibility distance
      strand1.connectionGenes[0].weight = 0.2;
      strand1.connectionGenes[1].weight = 0.1;
      strand1.connectionGenes[2].weight = 0.9;
      let mutatedDistance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(mutatedDistance).to.be.above(distance);

      // Evolving the first strand to closer match the second should decrease
      // its compatibility distance
      strand1._splitConnectionWithNode(strand1.connectionGenes[4]);
      let evolvedDistance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(evolvedDistance).to.be.below(distance);

      // There is zero distance between a strand and itself
      let clone = strand1.clone();
      distance = strand1.compatibilityDistance(clone, 1.0, 1.0, 1.0);
      expect(distance).to.equal(0);
    });
  });
});
