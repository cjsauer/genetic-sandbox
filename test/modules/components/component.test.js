import Component from "../../../src/modules/components/Component";
import { expect } from "chai";

describe("Component", () => {
  let phony;

  /* Stub out a fake component */
  class PhonyComponent extends Component {
    constructor() {
      super();
      this.a = "apple";
      this.b = 12;
      this.c = {
        fruit: "orange"
      };
      this.d = [ 1, 2, 3 ];
    }
    e(a, b) { return a + b; }
    f() { return this.a + this.c.fruit; }
  }

  class BolognaComponent extends Component {
    constructor() {
      super();
      this.nested = new PhonyComponent();
    }
  }

  beforeEach(() => {
    phony = new PhonyComponent();
  });

  it("should not be instantiable directly", () => {
    expect(() => new Component()).to.throw(TypeError);
  });

  it("can register constructors of subclasses for use in restoration", () => {
    Component.register(PhonyComponent);
    expect(Component._constructors["PhonyComponent"]).to.eql(PhonyComponent);
    Component.register(BolognaComponent);
    expect(Component._constructors["BolognaComponent"]).to.eql(BolognaComponent);
  });

  describe("serialize", () => {
    it("should output JSON for arbitrary subclasses", () => {
      const json = phony.serialize();
      expect(json).to.equal('{"ctor":"PhonyComponent","data":{"a":"apple","b":12,"c":{"fruit":"orange"},"d":[1,2,3]}}');
    });

    it("can blacklist specific keys", () => {
      const json = phony.serialize(["c", "d"]);
      expect(json).to.equal('{"ctor":"PhonyComponent","data":{"a":"apple","b":12}}');
    });

    it("is called recursively on nested Component instances", () => {
      const bologna = new BolognaComponent();
      const json = bologna.serialize(["a", "b"]);
      expect(json).to.equal('{"ctor":"BolognaComponent","data":{"nested":{"ctor":"PhonyComponent","data":{"c":{"fruit":"orange"},"d":[1,2,3]}}}}');
    });
  });

  describe("restore", () => {
    it("should restore the original component and its methods", () => {
      const json = phony.serialize();
      const restoredPhonyComponent = Component.restore(json);
      expect(restoredPhonyComponent).to.eql(phony);
      expect(restoredPhonyComponent.e(4, 6)).to.equal(10);
      expect(restoredPhonyComponent.f()).to.equal("appleorange");
    });

    it("should restore nested components and their methods", () => {
      const bologna = new BolognaComponent();
      const restoredBologna = Component.restore(bologna.serialize());
      expect(restoredBologna).to.eql(bologna);
      expect(restoredBologna.nested).to.eql(phony);
      expect(restoredBologna.nested.e(2, 1)).to.equal(3);
      expect(restoredBologna.nested.f()).to.equal("appleorange");
    });
  });
});
