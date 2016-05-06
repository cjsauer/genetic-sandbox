import Coord from "../../../src/modules/components/Coord";
import Component from "../../../src/modules/components/Component";
import { expect } from "chai";

describe("Coord", () => {
  it("should extend Component", () => {
    const coord = new Coord();
    expect(coord instanceof Component).to.be.true;
  });

  it("should default to (0, 0) when instantiated with no arguments", () => {
    const coord = new Coord();
    expect(coord).to.be.ok;
    expect(coord.x).to.equal(0);
    expect(coord.y).to.equal(0);
  });

  it("should be intantiable with (x, y) coordinates", () => {
    const coord = new Coord(10, 12);
    expect(coord).to.be.ok;
    expect(coord.x).to.equal(10);
    expect(coord.y).to.equal(12);
  });
});
