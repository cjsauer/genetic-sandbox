import ISystem from "../../../src/modules/systems/ISystem";
import { expect } from "chai";

describe("ISystem", () => {
  it("should not be instantiable", () => {
    expect(() => new ISystem()).to.throw(TypeError);
  });

  it("should throw when trying to call unimplemented methods", () => {
    class MySystem extends ISystem {}
    const mySystem = new MySystem();
    expect(mySystem.initialize).to.throw(/must be implemented/);
    expect(mySystem.update).to.throw(/must be implemented/);
  });
});
