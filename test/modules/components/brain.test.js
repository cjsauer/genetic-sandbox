import Brain from "../../../src/modules/components/Brain";
import Component from "../../../src/modules/components/Component";
import { expect } from "chai";
import { stub } from "sinon";

describe("Brain", () => {
  let sequencer, dna, network;

  beforeEach(() => {
    network = {
      neurons: [],
      connections: [],
      standalone: stub().returns(() => undefined)
    };

    sequencer = {
      read: stub().returns(network)
    };

    dna = {
      brainStrand: {
        nodeGenes: [],
        connectionGenes: []
      }
    };

    // Reset reservation state each test case
    Brain._inputNeuronCount = 0;
    Brain._outputNeuronCount = 0;
  });

  it("should extend Component", () => {
    const brain = new Brain(dna, sequencer);
    expect(brain instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Brain"]).to.eql(Brain);
  });

  it("can be instantiated given DNA and a sequencer", () => {
    const brain = new Brain(dna, sequencer);
    expect(brain).to.be.ok;
    expect(sequencer.read.calledWith(dna.brainStrand)).to.be.true;
    expect(brain._net).to.eql(network);
    expect(network.standalone.calledOnce).to.be.true;
    expect(brain._activate).to.eql(network.standalone());
  });

  it("can be instantiated with zero arguments", () => {
    const brain = new Brain();
    expect(brain).to.be.ok;
  });

  describe("reservation", () => {
    it("returns consecutive input/output indices with each reservation", () => {
      expect(Brain.reserveInput()).to.equal(0);
      expect(Brain.reserveInput()).to.equal(1);
      expect(Brain.reserveInput()).to.equal(2);
      expect(Brain.reserveInput()).to.equal(3);

      expect(Brain.reserveOutput()).to.equal(0);
      expect(Brain.reserveOutput()).to.equal(1);
      expect(Brain.reserveOutput()).to.equal(2);
      expect(Brain.reserveOutput()).to.equal(3);
    });
  });

  describe("I/O", () => {
    it("stores inputs ready to be activated", () => {
      const in1 = Brain.reserveInput();
      const in2 = Brain.reserveInput();
      const in3 = Brain.reserveInput();
      const brain = new Brain(dna, sequencer);

      brain.input(in1, 0.1);
      brain.input(in2, 0.2);
      brain.input(in3, 0.3);
      expect(brain._inputs).to.eql([0.1, 0.2, 0.3]);
    });

    it("produces output upon activation", () => {
      const out1 = Brain.reserveOutput();
      const out2 = Brain.reserveOutput();
      const brain = new Brain(dna, sequencer);

      expect(brain.output(out1)).to.be.undefined;
      expect(brain.output(out2)).to.be.undefined;

      stub(brain, "_activate").returns([0.1, 0.2]);
      brain.activate();
      brain._activate.restore();

      expect(brain.output(out1)).to.equal(0.1);
      expect(brain.output(out2)).to.equal(0.2);
    });
  });
});
