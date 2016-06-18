import Creature from "./Creature";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Creature", () => {
  it("should extend Component", () => {
    const creature = new Creature();
    expect(creature instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Creature"]).to.eql(Creature);
  });
});
