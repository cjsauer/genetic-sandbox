import Plant from "../../../src/modules/components/Plant";
import { expect } from "chai";

describe("Plant", () => {
  it("should contain energy", () => {
    const plant = new Plant(10);
    expect(plant.energy).to.equal(10);
  });

  it("should default to zero energy", () => {
    const plant = new Plant();
    expect(plant.energy).to.equal(0);
  });
});
