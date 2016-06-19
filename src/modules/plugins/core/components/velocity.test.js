import Velocity from "./Velocity";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Velocity", () => {
  it("should extend Component", () => {
    const velocity = new Velocity();
    expect(velocity instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Velocity"]).to.eql(Velocity);
  });

  it("should default to (0, 0) when instantiated with no arguments", () => {
    const velocity = new Velocity();
    expect(velocity).to.be.ok;
    expect(velocity.x).to.equal(0);
    expect(velocity.y).to.equal(0);
  });

  it("should be intantiable with (x, y) values", () => {
    const velocity = new Velocity(10, 12);
    expect(velocity).to.be.ok;
    expect(velocity.x).to.equal(10);
    expect(velocity.y).to.equal(12);
  });

  it("can determine if two velocityinates are equal", () => {
    const velocity1 = new Velocity(0, 0);
    const velocity2 = new Velocity(0, 0);
    const velocity3 = new Velocity(10, 12);

    expect(velocity1.equalTo(velocity2)).to.be.true;
    expect(velocity1.equalTo(velocity3)).to.be.false;
    expect(velocity2.equalTo(velocity3)).to.be.false;
  });
});
