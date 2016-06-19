import Serializable from "./Serializable";
import { expect } from "chai";

describe("Serializable", () => {
  let phony;

  /* Stub out a fake component */
  class Phony extends Serializable {
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

  class Bologna extends Serializable {
    constructor() {
      super();
      this.nested = new Phony();
    }
  }

  beforeEach(() => {
    phony = new Phony();
  });

  it("should not be instantiable directly", () => {
    expect(Serializable instanceof Function).to.be.true;
    expect(() => new Serializable()).to.throw(TypeError);
  });

  it("can register constructors of subclasses for use in restoration", () => {
    Serializable.register(Phony);
    expect(Serializable._constructors["Phony"]).to.eql(Phony);
    Serializable.register(Bologna);
    expect(Serializable._constructors["Bologna"]).to.eql(Bologna);
  });

  describe("serialize", () => {
    it("should output JSON for arbitrary subclasses", () => {
      const json = phony.serialize();
      expect(json).to.equal('{"ctor":"Phony","data":{"a":"apple","b":12,"c":{"fruit":"orange"},"d":[1,2,3]}}');
    });

    it("can blacklist specific keys", () => {
      const json = phony.serialize(["c", "d"]);
      expect(json).to.equal('{"ctor":"Phony","data":{"a":"apple","b":12}}');
    });

    it("is called recursively on nested Serializable instances", () => {
      const bologna = new Bologna();
      const json = bologna.serialize(["a", "b"]);
      expect(json).to.equal('{"ctor":"Bologna","data":{"nested":{"ctor":"Phony","data":{"c":{"fruit":"orange"},"d":[1,2,3]}}}}');
    });

    it("skips properties that begin with a bang (!)", () => {
      phony["!graphics"] = { color: "red" };
      const json = phony.serialize();
      expect(json).to.equal('{"ctor":"Phony","data":{"a":"apple","b":12,"c":{"fruit":"orange"},"d":[1,2,3]}}');
    });
  });

  describe("restore", () => {
    it("should restore the original component and its methods", () => {
      const json = phony.serialize();
      const restoredPhony = Serializable.restore(json);
      expect(restoredPhony).to.eql(phony);
      expect(restoredPhony.e(4, 6)).to.equal(10);
      expect(restoredPhony.f()).to.equal("appleorange");
    });

    it("should restore nested components and their methods", () => {
      const bologna = new Bologna();
      const restoredBologna = Serializable.restore(bologna.serialize());
      expect(restoredBologna).to.eql(bologna);
      expect(restoredBologna.nested).to.eql(phony);
      expect(restoredBologna.nested.e(2, 1)).to.equal(3);
      expect(restoredBologna.nested.f()).to.equal("appleorange");
    });
  });
});
