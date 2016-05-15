import Component from "../../../src/modules/components/Component";
import Serializable from "../../../src/modules/util/Serializable";
import { expect } from "chai";

describe("Component", () => {
  /* Stub out a fake component */
  class PhonyComponent extends Component {
  }

  it("should not be instantiable directly", () => {
    expect(() => new Component()).to.throw(TypeError);
    expect(() => new PhonyComponent()).to.not.throw(TypeError);
  });

  it("should extend Serializable", () => {
    const phony = new PhonyComponent();
    expect(phony instanceof Serializable).to.be.true;
  });
});
