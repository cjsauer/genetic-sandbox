import Strand from "./Strand";
import ConnectionGene from "./ConnectionGene";
import NodeGene from "./NodeGene";
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
    ConnectionGene.resetInnovations();
  });

  afterEach(() => {
    ConnectionGene.resetInnovations();
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
    let nodes = strand.nodes;
    expect(nodes).to.have.lengthOf(5);
    expect(nodes.inputNodeGeneCount).to.equal(2);
    expect(nodes.outputNodeGeneCount).to.equal(3);

    strand = new Strand(6, 4, true, random);
    nodes = strand.nodes;
    expect(nodes).to.have.lengthOf(10);
    expect(nodes.inputNodeGeneCount).to.equal(6);
    expect(nodes.outputNodeGeneCount).to.equal(4);
  });

  it("should use sequential node gene IDs", () => {
    let strand = new Strand(2, 3, true, random);
    let nodeGenes = strand.nodes.genes;

    let id = 1;
    nodeGenes.forEach((gene) => {
      expect(gene.id).to.equal(id++);
    });
    expect(strand._nextNodeGeneID()).to.equal(6);

    strand.nodes.addGene(new NodeGene(10, "hidden"));
    expect(strand._nextNodeGeneID()).to.equal(11);

    let emptyStrand = new Strand();
    expect(emptyStrand._nextNodeGeneID()).to.equal(1);
  });

  it("should be instantiated with zero hidden node genes", () => {
    let strand = new Strand(2, 3, true, random);
    expect(strand.nodes.hiddenNodeGeneCount).to.equal(0);
  });

  it("describes a fully connected neural network", () => {
    let strand = new Strand(2, 3, true, random);
    let connections = strand.connections;
    expect(connections).to.have.lengthOf(6);

    strand = new Strand(9, 7, true, random);
    connections = strand.connections;
    expect(connections).to.have.lengthOf(63);
  });

  it("is created with either all connection genes enabled, or all connection genes disabled", () => {
    let strand = new Strand(2, 3, false, random); // All disabled
    let connectionGenes = strand.connections.genes;
    expect(connectionGenes.filter(isDisabled)).to.have.lengthOf(6);

    strand = new Strand(2, 3, true, random); // All enabled
    connectionGenes = strand.connections.genes;
    expect(connectionGenes.filter(isEnabled)).to.have.lengthOf(6);
  });

  it("can determine if two node genes are already connected", () => {
    let strand = new Strand(2, 1, true, random);
    let connectionGenes = strand.connections.genes;
    strand._splitConnectionWithNode(connectionGenes[0]);

    expect(strand._areConnected(1, 4)).to.be.true;
    expect(strand._areConnected(4, 3)).to.be.true;
    expect(strand._areConnected(2, 3)).to.be.true;
    expect(strand._areConnected(1, 2)).to.be.false;
    expect(strand._areConnected(2, 4)).to.be.false;
    expect(strand._areConnected(4, 2)).to.be.false;
    expect(strand._areConnected(3, 2)).to.be.false;
  });

  it("can determine if two node genes could potentially be connected", () => {
    let strand = new Strand(2, 1, true, random);
    let connectionGenes = strand.connections.genes;
    strand._splitConnectionWithNode(connectionGenes[0]);

    // A valid connection
    expect(strand._canConnect(2, 4)).to.be.true;

    // Cannot use an input node as a destination
    expect(strand._canConnect(2, 1)).to.be.false;
    expect(strand._canConnect(1, 2)).to.be.false;

    // Cannot use an output node as a source
    expect(strand._canConnect(3, 4)).to.be.false;

    // Cannot connect two nodes that are already connected
    expect(strand._canConnect(1, 4)).to.be.false;
    expect(strand._canConnect(2, 3)).to.be.false;
    expect(strand._canConnect(4, 3)).to.be.false;
  });

  it("can be cloned", () => {
    let strand = new Strand(2, 1, true, random);
    let clone = strand.clone();
    expect(strand.connections).to.eql(clone.connections);
    expect(strand.nodes).to.eql(clone.nodes);
    expect(strand._nextNodeGeneID()).to.equal(clone._nextNodeGeneID());
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

      let connectionGenes = strand.connections.genes;
      let weights = connectionGenes.map((gene) => gene.weight);
      expect(weights[0]).to.equal(0.505);
      expect(weights[1]).to.equal(0.1);
    });

    it("can split a given connection gene with a node gene, preserving behavior", () => {
      let strand = new Strand(2, 1, true, random);
      let originalConnectionGeneCount = strand.connections.length;
      let connectionGenes = strand.connections.genes;
      let connectionGene = connectionGenes[0];

      strand._splitConnectionWithNode(connectionGene);

      let incomingConnection = connectionGenes[originalConnectionGeneCount];
      let outgoingConnection = connectionGenes[originalConnectionGeneCount + 1];
      expect(connectionGene.enabled).to.be.false;
      expect(strand.connections.length).to.equal(originalConnectionGeneCount + 2);
      expect(incomingConnection.weight).to.equal(1);
      expect(outgoingConnection.weight).to.equal(connectionGene.weight);
    });

    it("can split a random connection with a node gene, preserving behavior", () => {
      let strand = new Strand(2, 1, true, random);
      let connectionGenes = strand.connections.genes;
      let originalNodeGeneCount = strand.nodes.length;
      spy(strand, "_splitConnectionWithNode");
      random.pick = stub().returns(connectionGenes[0]);

      strand.addRandomNodeGene(random);
      expect(strand.nodes).to.have.lengthOf(originalNodeGeneCount + 1);
      expect(strand._splitConnectionWithNode.calledWith(connectionGenes[0])).to.be.true;
    });

    it("can connect two given nodes", () => {
      let strand = new Strand(1, 2, true, random);
      let connectionGenes = strand.connections.genes;
      strand._splitConnectionWithNode(connectionGenes[0]);
      let originalConnectionGeneCount = strand.connections.length;

      // Valid connection
      let connection = strand._connect(4, 3, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      // Recurrent connection
      connection = strand._connect(4, 4, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      // Invalid connection
      connection = strand._connect(1, 4, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount);
      expect(connection).to.be.null;
    });

    it("can randomly add a new connection between two nodes", () => {
      let strand = new Strand(1, 2, true, random);
      let connectionGenes = strand.connections.genes;
      let nodes = strand.nodes;
      strand._splitConnectionWithNode(connectionGenes[0]);
      let originalConnectionGeneCount = strand.connections.length;
      random.pick = stub();

      // Test a normal connection
      random.pick.onCall(0).returns(nodes.getGene(4));
      random.pick.onCall(1).returns(nodes.getGene(3));

      // Test a recurrent connection
      random.pick.onCall(2).returns(nodes.getGene(4));
      random.pick.onCall(3).returns(nodes.getGene(4));

      // Test the event of two appropriate nodes never being found
      random.pick.returns(nodes.getGene(1));

      let connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount += 1);
      expect(connection.weight).to.equal(0.5);

      connection = strand.addRandomConnectionGene(3, random);
      expect(strand.connections).to.have.lengthOf(originalConnectionGeneCount);
      expect(connection).to.be.null;
    });

    it("can randomly mutate itself", () => {
      let strand = new Strand(2, 1, true, random);
      let mutateWeightsChance = 0.8;
      let perturbChance = 0.9;
      let perturbAmplitude = 0.1;
      let newValueChance = 0.1;
      let addNodeChance = 0.03;
      let addConnectionChance = 0.05;

      random.bool = stub().returns(true);
      random.pick = (a) => a[0];
      spy(strand, "mutateWeights");
      spy(strand, "addRandomNodeGene");
      spy(strand, "addRandomConnectionGene");
      strand.mutate(mutateWeightsChance, perturbChance, perturbAmplitude, newValueChance, addNodeChance, addConnectionChance, random);
      expect(strand.mutateWeights.calledWith(perturbChance, perturbAmplitude, newValueChance, random)).to.be.true;
      expect(strand.addRandomNodeGene.calledOnce).to.be.true;
      expect(strand.addRandomConnectionGene.calledOnce).to.be.true;

      random.bool = stub().returns(false);
      strand.mutateWeights.reset();
      strand.addRandomNodeGene.reset();
      strand.addRandomConnectionGene.reset();
      strand.mutate(mutateWeightsChance, perturbChance, perturbAmplitude, newValueChance, addNodeChance, addConnectionChance, random);
      expect(strand.mutateWeights.calledOnce).to.be.false;
      expect(strand.addRandomNodeGene.calledOnce).to.be.false;
      expect(strand.addRandomConnectionGene.calledOnce).to.be.false;
    });
  });

  describe("operations", () => {
    let strand1, strand2;

    beforeEach(() => {
      // Mimic some evolution of two strands using the two examples given on
      // page 12 of the NEAT pdf: http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
      strand1 = new Strand(3, 1, true, random);
      strand1._splitConnectionWithNode(strand1.connections.genes[1]);
      strand2 = new Strand(3, 1, true, random);
      strand2._splitConnectionWithNode(strand2.connections.genes[1]);
      strand2._splitConnectionWithNode(strand2.connections.genes[4]);
      strand1._connect(1, 5, random);
      strand2._connect(3, 5, random);
      strand2._connect(1, 6, random);
    });

    it("can crossover with another strand", () => {
      random.bool = stub();
      random.bool.withArgs(0.5).onCall(0).returns(true); // parent 1's matching gene
      random.bool.withArgs(0.5).onCall(1).returns(false); // parent 2's matching gene
      random.bool.withArgs(0.5).onCall(2).returns(true);
      random.bool.withArgs(0.5).onCall(3).returns(false);
      random.bool.withArgs(0.5).onCall(4).returns(true);
      random.bool.withArgs(0.25).onCall(0).returns(false); // Don't disable gene
      random.bool.withArgs(0.25).onCall(1).returns(true); // Do disable gene

      // strand1 assumed to be more fit
      let offspring = strand1.crossover(strand2, 0.25, false, random);
      let connectionGenes = offspring.connections.genes;
      let nodeGenes = offspring.nodes.genes;
      let innovations = connectionGenes.map((gene) => gene.innovationNumber);
      let nodeIDs = nodeGenes.map((gene) => gene.id);
      expect(innovations).to.include.members([1, 2, 3, 4, 5, 8]);
      expect(nodeIDs).to.include.members([1, 2, 3, 4, 5]);
      expect(innovations).to.have.lengthOf(6);
      expect(nodeIDs).to.have.lengthOf(5);
      expect(offspring._nextNodeGeneID()).to.equal(6);
      expect(offspring.connections.getGene(2).enabled).to.be.true;
      expect(offspring.connections.getGene(5).enabled).to.be.false;

      random.bool = stub();
      random.bool.withArgs(0.5).onCall(0).returns(true); // parent 1's matching gene
      random.bool.withArgs(0.5).onCall(1).returns(false); // parent 2's matching gene
      random.bool.withArgs(0.5).onCall(2).returns(true);
      random.bool.withArgs(0.5).onCall(3).returns(false);
      random.bool.withArgs(0.5).onCall(4).returns(true);
      random.bool.withArgs(0.25).onCall(0).returns(true); // Do disable gene
      random.bool.withArgs(0.25).onCall(1).returns(false); // Don't disable gene
      // strand2 assumed to be more fit
      offspring = strand2.crossover(strand1, 0.25, false, random);
      connectionGenes = offspring.connections.genes;
      nodeGenes = offspring.nodes.genes;
      innovations = connectionGenes.map((gene) => gene.innovationNumber);
      nodeIDs = nodeGenes.map((gene) => gene.id);
      expect(innovations).to.include.members([1, 2, 3, 4, 5, 6, 7, 9, 10]);
      expect(nodeIDs).to.include.members([1, 2, 3, 4, 5, 6]);
      expect(innovations).to.have.lengthOf(9);
      expect(nodeIDs).to.have.lengthOf(6);
      expect(offspring._nextNodeGeneID()).to.equal(7);
      expect(offspring.connections.getGene(2).enabled).to.be.false;
      expect(offspring.connections.getGene(5).enabled).to.be.true;

      random.bool = stub();
      random.bool.returns(true); // Don't really care about this for this case
      // Inherit all disjoint and excess genes from both parents
      offspring = strand1.crossover(strand2, 0.25, true, random);
      connectionGenes = offspring.connections.genes;
      nodeGenes = offspring.nodes.genes;
      innovations = connectionGenes.map((gene) => gene.innovationNumber);
      nodeIDs = nodeGenes.map((gene) => gene.id);
      expect(innovations).to.include.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(nodeIDs).to.include.members([1, 2, 3, 4, 5, 6]);
      expect(innovations).to.have.lengthOf(10);
      expect(nodeIDs).to.have.lengthOf(6);
      expect(offspring._nextNodeGeneID()).to.equal(7);
      expect(offspring.connections.getGene(2).enabled).to.be.false;
      expect(offspring.connections.getGene(5).enabled).to.be.false;
    });

    it("can determine matching genes between strands", () => {
      let strand1Connections = strand1.connections;
      let strand2Connections = strand2.connections;

      let matchingGenes = strand1._matching(strand2);
      expect(matchingGenes).to.have.lengthOf(5);
      expect(matchingGenes[0]).to.eql([strand1Connections.getGene(1), strand2Connections.getGene(1)]);
      expect(matchingGenes[1]).to.eql([strand1Connections.getGene(2), strand2Connections.getGene(2)]);
      expect(matchingGenes[2]).to.eql([strand1Connections.getGene(3), strand2Connections.getGene(3)]);
      expect(matchingGenes[3]).to.eql([strand1Connections.getGene(4), strand2Connections.getGene(4)]);
      expect(matchingGenes[4]).to.eql([strand1Connections.getGene(5), strand2Connections.getGene(5)]);

      matchingGenes = strand2._matching(strand1);
      expect(matchingGenes).to.have.lengthOf(5);
      expect(matchingGenes[0]).to.eql([strand2Connections.getGene(1), strand1Connections.getGene(1)]);
      expect(matchingGenes[1]).to.eql([strand2Connections.getGene(2), strand1Connections.getGene(2)]);
      expect(matchingGenes[2]).to.eql([strand2Connections.getGene(3), strand1Connections.getGene(3)]);
      expect(matchingGenes[3]).to.eql([strand2Connections.getGene(4), strand1Connections.getGene(4)]);
      expect(matchingGenes[4]).to.eql([strand2Connections.getGene(5), strand1Connections.getGene(5)]);
    });

    it("can determine disjoint genes between strands", () => {
      let strand1Connections = strand1.connections;
      let strand2Connections = strand2.connections;

      let disjointGenes = strand1._disjoint(strand2);
      expect(disjointGenes).to.have.lengthOf(2);
      expect(disjointGenes[0]).to.eql([strand1Connections.getGene(8)]);
      expect(disjointGenes[1]).to.eql([strand2Connections.getGene(6), strand2Connections.getGene(7)]);

      disjointGenes = strand2._disjoint(strand1);
      expect(disjointGenes).to.have.lengthOf(2);
      expect(disjointGenes[0]).to.eql([strand2Connections.getGene(6), strand2Connections.getGene(7)]);
      expect(disjointGenes[1]).to.eql([strand1Connections.getGene(8)]);
    });

    it("can determine excess genes between strands", () => {
      let strand2Connections = strand2.connections;

      let excessGenes = strand1._excess(strand2);
      expect(excessGenes[0]).to.have.lengthOf(0);
      expect(excessGenes[1]).to.have.lengthOf(2);
      expect(excessGenes[1]).to.eql([strand2Connections.getGene(9), strand2Connections.getGene(10)]);

      excessGenes = strand2._excess(strand1);
      expect(excessGenes[0]).to.have.lengthOf(2);
      expect(excessGenes[0]).to.eql([strand2Connections.getGene(9), strand2Connections.getGene(10)]);
      expect(excessGenes[1]).to.have.lengthOf(0);
    });

    it("can compute the compatibility distance between two strands", () => {
      let strand1ConnectionGenes = strand1.connections.genes;

      let distance = strand1.compatibilityDistance(strand2, 1.0, 1.0, 1.0);
      expect(distance).to.equal(5);
      distance = strand1.compatibilityDistance(strand2, 0.5, 1.0, 1.0);
      expect(distance).to.equal(4);
      distance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(distance).to.equal(2.5);

      // Moving weights farther apart should increase the compatibility distance
      strand1ConnectionGenes[0].weight = 0.2;
      strand1ConnectionGenes[1].weight = 0.1;
      strand1ConnectionGenes[2].weight = 0.9;
      let mutatedDistance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(mutatedDistance).to.be.above(distance);

      // Evolving the first strand to closer match the second should decrease
      // its compatibility distance
      strand1._splitConnectionWithNode(strand1ConnectionGenes[4]);
      let evolvedDistance = strand1.compatibilityDistance(strand2, 0.5, 0.5, 1.0);
      expect(evolvedDistance).to.be.below(distance);

      // There is zero distance between a strand and itself
      let clone = strand1.clone();
      distance = strand1.compatibilityDistance(clone, 1.0, 1.0, 1.0);
      expect(distance).to.equal(0);
    });
  });
});
