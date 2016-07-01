import Sequencer from "./Sequencer";
import Strand from "./Strand";
import synaptic from "synaptic";
import { expect } from "chai";
import { stub } from "sinon";

describe("Sequencer", () => {
  let random;

  beforeEach(() => {
    random = {
      real: stub().returns(0.5)
    };
  });

  it("should read in a Strand and produce a Synaptic neural network", () => {
    const sequencer = new Sequencer();
    const strand = new Strand(2, 2, true, random);
    strand._splitConnectionWithNode(strand.connectionGenes[0]); // Add a hidden neuron
    strand._connect(strand.nodeGenes[4], strand.nodeGenes[4], random); // Make a recurrent connection

    const network = sequencer.read(strand);

    expect(network instanceof synaptic.Network).to.be.true;
    expect(network.neurons()).to.have.lengthOf(5);
    expect(network.inputs()).to.equal(2);
    expect(network.outputs()).to.equal(2);
    expect(network.layers.hidden[0].size).to.equal(1);

    // Recurrent connections are expressed differently from normal ones in synaptic
    let connectionCount = network.neurons()
      .map((n) => { return Object.keys(n.neuron.connections.projected).length; })
      .reduce((prev, curr) => { return prev + curr; }, 0);
    let selfConnectionCount = network.neurons().filter((n) => { return n.neuron.selfconnection.weight === 1; }).length;
    expect(connectionCount).to.equal(6);
    expect(selfConnectionCount).to.equal(1);
  });

  it("should set all neuron biases to 1", () => {
    const sequencer = new Sequencer();
    const strand = new Strand(3, 4, true, random);
    const network = sequencer.read(strand);
    network.neurons().forEach(({neuron}) => {
      expect(neuron.bias).to.equal(1);
    });
  });

  it("should set connection weights for enabled connection genes", () => {
    const sequencer = new Sequencer();
    const strand = new Strand(3, 4, true, random);
    const network = sequencer.read(strand);
    network.neurons().forEach(({neuron}) => {
      Object.values(neuron.connections.inputs).forEach((connection) => {
        // Random number generator is stubbed to always return 0.5
        expect(connection.weight).to.equal(0.5);
      });
      Object.values(neuron.connections.projected).forEach((connection) => {
        expect(connection.weight).to.equal(0.5);
      });
    });
  });

  it("should set connection weights to zero for disabled connection genes", () => {
    const sequencer = new Sequencer();
    const strand = new Strand(3, 4, false, random);
    const network = sequencer.read(strand);
    network.neurons().forEach(({neuron}) => {
      Object.values(neuron.connections.inputs).forEach((connection) => {
        expect(connection.weight).to.equal(0);
      });
      Object.values(neuron.connections.projected).forEach((connection) => {
        expect(connection.weight).to.equal(0);
      });
    });
  });
});
