import System from "./System";
import { expect } from "chai";

describe("System", () => {
  it("should not be instantiable", () => {
    expect(System instanceof Function).to.be.true;
    expect(() => new System()).to.throw(TypeError);
  });
});
