import Energy from "./Energy";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Energy", () => {
  it("should extend Component", () => {
    const energy = new Energy();
    expect(energy instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Energy"]).to.eql(Energy);
  });

  it("should be instantiable with an energy level", () => {
    const energy = new Energy(10);
    expect(energy.level).to.equal(10);
  });

  it("can be gained", () => {
    const energy = new Energy(10);
    expect(energy.gain(6)).to.equal(16);
    expect(energy.gain(7)).to.equal(23);
    expect(energy.gain(8)).to.equal(31);
  });

  it("can be expended", () => {
    const energy = new Energy(10);
    expect(energy.level).to.equal(10);
    expect(energy.expend(4)).to.equal(6);
    expect(energy.level).to.equal(6);
    expect(energy.expend(100)).to.equal(0);
    expect(energy.level).to.equal(0);
  });
});
