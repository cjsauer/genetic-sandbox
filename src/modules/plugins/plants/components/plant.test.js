import Plant from "./Plant";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Plant", () => {
  it("should extend Component", () => {
    const plant = new Plant();
    expect(plant instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Plant"]).to.eql(Plant);
  });
});
