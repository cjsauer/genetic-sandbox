import Entity from "../../../src/modules/plugins/Entity";
import Component from "../../../src/modules/plugins/Component";
import { expect } from "chai";
import { spy } from "sinon";

describe("Entity", () => {
  class CompA extends Component { constructor() { super("a"); } }
  class CompB extends Component { constructor() { super("b"); } }
  class CompC extends Component { constructor() { super("c"); } }

  it("should have a unique ID", () => {
    let entity1 = new Entity();
    let entity2 = new Entity();
    let entity3 = new Entity();

    expect(entity1.id).to.not.equal(entity2.id);
    expect(entity2.id).to.not.equal(entity3.id);
    expect(entity1.id).to.not.equal(entity3.id);
  });

  it("can add components", () => {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new CompC());

    expect(entity.hasComponent("a")).to.be.true;
    expect(entity.hasComponent("b")).to.be.true;
    expect(entity.hasComponent("c")).to.be.true;
    expect(entity.hasComponent("d")).to.be.false;
  });

  it("can remove components", () => {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new CompC());

    entity.removeComponent("a");
    entity.removeComponent("b");

    expect(entity.hasComponent("a")).to.be.false;
    expect(entity.hasComponent("b")).to.be.false;
    expect(entity.hasComponent("c")).to.be.true;
    expect(entity.hasComponent("d")).to.be.false;
  });

  it("can return a given component", () => {
    let entity = new Entity();
    let compA = new CompA();
    let compB = new CompB();
    let compC = new CompC();
    entity.addComponent(compA);
    entity.addComponent(compB);
    entity.addComponent(compC);

    expect(entity.getComponent("a")).to.eql(compA);
    expect(entity.getComponent("b")).to.eql(compB);
    expect(entity.getComponent("c")).to.eql(compC);
    expect(entity.getComponent("d")).to.be.null;
  });

  it("should emit an event when adding a component", () => {
    const entity = new Entity();
    const component = new CompA();
    const cb = spy();
    entity.addListener("componentAdded", cb);

    entity.addComponent(component);
    expect(cb.calledWith({
      entity,
      component
    })).to.be.true;
  });

  it("should emit an event when removing a component", () => {
    const entity = new Entity();
    const component = new CompA();
    const cb = spy();
    entity.addListener("componentRemoved", cb);
    entity.addComponent(component);

    entity.removeComponent("a");

    expect(cb.calledWith({
      entity,
      component
    })).to.be.true;
  });
});
