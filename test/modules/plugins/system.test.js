import System from "../../../src/modules/plugins/System";
import { expect } from "chai";

describe("System", () => {
  it("should not be instantiable", () => {
    expect(System instanceof Function).to.be.true;
    expect(() => new System()).to.throw(TypeError);
  });

  it("should throw when trying to call unimplemented methods", () => {
    class MySystem extends System {}
    const mySystem = new MySystem();
    expect(mySystem.initialize).to.throw(/must be implemented/);
    expect(mySystem.update).to.throw(/must be implemented/);
  });
});
