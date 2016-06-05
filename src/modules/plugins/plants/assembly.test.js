import { buildPlant } from "./assembly";
import Coord from "../core/components/Coord";
import { expect } from "chai";

describe("Plant assembly", () => {
  it("can build plant entities", () => {
    let coord = new Coord(0, 0);
    let plant = buildPlant(10, coord);
    expect(plant.hasComponent("plant")).to.be.true;
    expect(plant.hasComponent("energy")).to.be.true;
    expect(plant.getComponent("energy").level).to.equal(10);
    expect(plant.hasComponent("coord")).to.be.true;
    expect(plant.getComponent("coord")).to.eql(coord);
  });
});
