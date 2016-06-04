import Family from "../../../src/modules/plugins/Family";
import Entity from "../../../src/modules/plugins/Entity";
import Component from "../../../src/modules/plugins/Component";
import { expect } from "chai";

describe("Family", () => {
  let entity1, entity2, entity3;

  class CompA extends Component { constructor() { super("a"); } }
  class CompB extends Component { constructor() { super("b"); } }
  class CompC extends Component { constructor() { super("c"); } }

  beforeEach(() => {
    entity1 = new Entity();
    entity1.addComponent(new CompA());
    entity1.addComponent(new CompB());
    entity1.addComponent(new CompC());

    entity2 = new Entity();
    entity2.addComponent(new CompA());
    entity2.addComponent(new CompB());

    entity3 = new Entity();
    entity3.addComponent(new CompA());
  });

  it("is instantiable given an array of component names", () => {
    const family = new Family(["a", "b", "c"]);
    expect(family._componentNames).to.eql(["a", "b", "c"]);
  });

  it("adds an entity to itself if it contains all of the required components", () => {
    const family = new Family(["a", "b", "c"]);
    family.addEntityIfMatch(entity1);
    family.addEntityIfMatch(entity2);
    family.addEntityIfMatch(entity3);

    expect(family._entities[entity1.id]).to.eql(entity1);
    expect(family._entities[entity2.id]).to.be.undefined;
    expect(family._entities[entity3.id]).to.be.undefined;
  });

  it("can remove a given entity", () => {
    const family = new Family(["a"]);
    family.addEntityIfMatch(entity1);
    family.addEntityIfMatch(entity2);
    family.addEntityIfMatch(entity3);

    expect(family._entities[entity1.id]).to.eql(entity1);
    expect(family._entities[entity2.id]).to.eql(entity2);
    expect(family._entities[entity3.id]).to.eql(entity3);

    family.removeEntity(entity1);
    family.removeEntity(entity2);

    expect(family._entities[entity1.id]).to.be.undefined;
    expect(family._entities[entity2.id]).to.be.undefined;
    expect(family._entities[entity3.id]).to.eql(entity3);
  });

  it("can return an array of all its entities", () => {
    const family = new Family(["a"]);
    family.addEntityIfMatch(entity1);
    family.addEntityIfMatch(entity2);
    family.addEntityIfMatch(entity3);

    expect(family.getEntities()).to.include.members([entity1, entity2, entity3]);
  });

  it("handles the event of a required component being removed from an entity", () => {
    const family = new Family(["a", "b"]);
    entity1.addListener("componentRemoved", family.onComponentRemoved.bind(family));
    entity2.addListener("componentRemoved", family.onComponentRemoved.bind(family));
    family.addEntityIfMatch(entity1);
    family.addEntityIfMatch(entity2);
    expect(family.getEntities()).to.include.members([entity1, entity2]);

    // Removing CompC doesn't affect the family
    entity1.removeComponent("c");

    expect(family.getEntities()).to.include.members([entity1, entity2]);

    // Removing either CompA or CompB from an entity disqualifies it from
    // this family
    entity1.removeComponent("a");
    entity2.removeComponent("b");

    expect(family.getEntities()).to.not.include.members([entity1, entity2]);
  });

  it("adding a component to an entity in the family does not affect the family", () => {
    const family = new Family(["a", "b"]);
    family.addEntityIfMatch(entity2);
    expect(family.getEntities()).to.include.members([entity2]);

    // Adding a component can never disqualify an entity from a family
    entity2.addComponent(new CompC());

    expect(family.getEntities()).to.include.members([entity2]);
  });

  it("can be hashed", () => {
    let family = new Family(["a", "b", "c"]);
    expect(family.hash).to.equal("$a,b,c");

    family = new Family(["b", "a", "d", "r", "k"]);
    expect(family.hash).to.equal("$a,b,d,k,r");
  });
});
