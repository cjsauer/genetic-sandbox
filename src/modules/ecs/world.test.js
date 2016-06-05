import World from "./World";
import Entity from "./Entity";
import Component from "./Component";
import { expect } from "chai";

describe("World", () => {
  let world;

  class CompA extends Component { constructor() { super("a"); } }
  class CompB extends Component { constructor() { super("b"); } }
  class CompC extends Component { constructor() { super("c"); } }

  function createEntity1() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new CompC());
    return entity;
  }

  function createEntity2() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    return entity;
  }

  function createEntity3() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompC());
    return entity;
  }

  beforeEach(() => {
    world = new World();

    // Fill up the world with entities
    for (let i = 0; i < 10; i++) {
      world.addEntity(createEntity1());
      world.addEntity(createEntity2());
      world.addEntity(createEntity3());
    }
  });

  it("can return an array of all its entities", () => {
    expect(world.getEntities()).to.have.length(30);
  });

  it("can be queried for all entities with the given components", () => {
    expect(world.getEntitiesWith("a")).to.have.length(30);
    expect(world.getEntitiesWith("b")).to.have.length(20);
    expect(world.getEntitiesWith("c")).to.have.length(20);
    expect(world.getEntitiesWith("a", "b", "c")).to.have.length(10);
    expect(world.getEntitiesWith("a", "b")).to.have.length(20);
    expect(world.getEntitiesWith("a", "c")).to.have.length(20);
    expect(world.getEntitiesWith("a", "b", "c", "d")).to.have.length(0);
  });

  it("should update all families when adding a component to an entity", () => {
    let entity2 = createEntity2();
    let entity3 = createEntity3();
    world.addEntity(entity2);
    world.addEntity(entity3);
    expect(world.getEntitiesWith("a", "b", "c")).to.have.length(10);

    entity2.addComponent(new CompC());
    entity3.addComponent(new CompB());

    expect(world.getEntitiesWith("a", "b", "c")).to.have.length(12);
  });

  it("should update all families when removing components from an entity", () => {
    let entities = world.getEntitiesWith("a", "b", "c");
    expect(entities).to.have.length(10);

    entities[0].removeComponent("a");
    entities[1].removeComponent("b");
    entities[2].removeComponent("c");

    expect(world.getEntitiesWith("a", "b", "c")).to.have.length(7);
  });
});
