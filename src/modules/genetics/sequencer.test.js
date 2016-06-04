import Sequencer from "./Sequencer";
import Strand from "../plugins/core/components/genetics/Strand";
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
    const strand = new Strand(3, 4, true, random);
    const network = sequencer.read(strand);
    // TODO: Add and test some hidden neurons too!

    expect(network.inputs()).to.equal(3);
    expect(network.outputs()).to.equal(4);
    expect(network.layers.hidden[0].size).to.equal(0);
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
