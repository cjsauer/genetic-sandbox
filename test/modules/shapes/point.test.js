import Point from "../../../src/modules/shapes/Point";
import { expect } from "chai";

describe("Point", () => {
  it("should default to (0, 0) when instantiated with no arguments", () => {
    const point = new Point();
    expect(point).to.be.ok;
    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
  });

  it("should be intantiable with (x, y) coordinates", () => {
    const point = new Point(10, 12);
    expect(point).to.be.ok;
    expect(point.x).to.equal(10);
    expect(point.y).to.equal(12);
  });
});
