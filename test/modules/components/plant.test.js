import Plant from "../../../src/modules/components/Plant";
import Component from "../../../src/modules/components/Component";
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

  describe("serialization", () => {
    let plant;

    beforeEach(() => {
      plant = new Plant(10);
    });

    it("should produce JSON", () => {
      const json = plant.serialize();
      expect(json).to.equal('{"ctor":"Plant","data":{"energy":10}}');
    });

    it("can be restored", () => {
      const { data } = JSON.parse(plant.serialize());
      const restoredPlant = Component.restore(Plant, data);
      expect(restoredPlant).to.eql(plant);
    });
  });
});
