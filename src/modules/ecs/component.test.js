import Component from "./Component";
import Serializable from "../util/Serializable";
import { expect } from "chai";

describe("Component", () => {
  /* Stub out a fake component */
  class PhonyComponent extends Component {
    constructor() {
      super("phony");
    }
  }

  it("should not be instantiable directly", () => {
    expect(Component instanceof Function).to.be.true;
    expect(() => new Component()).to.throw(TypeError);
    expect(() => new PhonyComponent()).to.not.throw(TypeError);
  });

  it("should extend Serializable", () => {
    const phony = new PhonyComponent();
    expect(phony instanceof Serializable).to.be.true;
  });

  it("should possess a name", () => {
    const phony = new PhonyComponent();
    expect(phony.name).to.equal("phony");
  });
});
