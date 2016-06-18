import Coord from "./Coord";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Coord", () => {
  it("should extend Component", () => {
    const coord = new Coord();
    expect(coord instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Coord"]).to.eql(Coord);
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

  it("can determine if two coordinates are equal", () => {
    const coord1 = new Coord(0, 0);
    const coord2 = new Coord(0, 0);
    const coord3 = new Coord(10, 12);

    expect(coord1.equalTo(coord2)).to.be.true;
    expect(coord1.equalTo(coord3)).to.be.false;
    expect(coord2.equalTo(coord3)).to.be.false;
  });
});
