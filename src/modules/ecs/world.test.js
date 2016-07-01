import World from "./World";
import Entity from "./Entity";
import Component from "./Component";
import Coord from "../plugins/core/components/Coord";
import Sprite from "../plugins/core/components/Sprite";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("World", () => {
  let world, paper;

  class CompA extends Component { constructor() { super("a"); } }
  class CompB extends Component { constructor() { super("b"); } }
  class CompC extends Component { constructor() { super("c"); } }

  function createEntity1() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new CompC());
    entity.addComponent(new Coord(0, 0));
    return entity;
  }

  function createEntity2() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new Coord(1, 0));
    return entity;
  }

  function createEntity3() {
    let entity = new Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompC());
    entity.addComponent(new Coord(0, 1));
    return entity;
  }

  function createEntityWithSprite() {
    let entity = new Entity();
    entity.addComponent(new Sprite("default"));
    return entity;
  }

  beforeEach(() => {
    world = new World();

    paper = {
      Path: {
        Circle: stub().returns({})
      },
      Symbol: stub().returns({
        place: stub().returns({
          remove: spy(),
          rasterize: stub().returns({
            remove: spy()
          })
        })
      })
    };

    // Fill up the world with entities
    for (let i = 0; i < 10; i++) {
      world.addEntity(createEntity1());
      world.addEntity(createEntity2());
      world.addEntity(createEntity3());
    }
  });

  it("can return an array of all its entities", () => {
    expect(world.getEntities()).to.have.lengthOf(30);
  });

  it("can add one entity at a time", () => {
    world.addEntity(new Entity());
    world.addEntity(new Entity());
    world.addEntity(new Entity());

    expect(world.getEntities()).to.have.lengthOf(33);
  });

  it("can't add the same entity twice", () => {
    const entity = new Entity();
    world.addEntity(entity);
    world.addEntity(entity);

    expect(world.getEntities()).to.have.lengthOf(31);
  });

  it("can add an array of entities", () => {
    world.addEntities([ new Entity(), new Entity(), new Entity() ]);

    expect(world.getEntities()).to.have.lengthOf(33);
  });

  it("can remove an entity", () => {
    const entity = new Entity();

    world.addEntity(entity);
    expect(world._entities[entity.id]).to.be.ok;
    expect(world.getEntities()).to.have.lengthOf(31);

    world.removeEntity(entity);
    expect(world._entities[entity.id]).to.be.undefined;
    expect(world.getEntities()).to.have.lengthOf(30);
  });

  it("cleans up an entity's sprite upon removal", () => {
    const entity = createEntityWithSprite();
    const sprite = entity.getComponent("sprite");
    const item = sprite.getItem(paper);
    world.addEntity(entity);

    world.removeEntity(entity);
    expect(item.remove.calledOnce).to.be.true;
  });

  it("can be queried for all entities with the given components", () => {
    expect(world.getEntitiesWith("a")).to.have.lengthOf(30);
    expect(world.getEntitiesWith("b")).to.have.lengthOf(20);
    expect(world.getEntitiesWith("c")).to.have.lengthOf(20);
    expect(world.getEntitiesWith("a", "b", "c")).to.have.lengthOf(10);
    expect(world.getEntitiesWith("a", "b")).to.have.lengthOf(20);
    expect(world.getEntitiesWith("a", "c")).to.have.lengthOf(20);
    expect(world.getEntitiesWith("a", "b", "c", "d")).to.have.lengthOf(0);
  });

  it("should update all families when adding a component to an entity", () => {
    let entity2 = createEntity2();
    let entity3 = createEntity3();
    world.addEntity(entity2);
    world.addEntity(entity3);
    expect(world.getEntitiesWith("a", "b", "c")).to.have.lengthOf(10);

    entity2.addComponent(new CompC());
    entity3.addComponent(new CompB());

    expect(world.getEntitiesWith("a", "b", "c")).to.have.lengthOf(12);
  });

  it("should update all families when removing components from an entity", () => {
    let entities = world.getEntitiesWith("a", "b", "c");
    expect(entities).to.have.lengthOf(10);

    entities[0].removeComponent("a");
    entities[1].removeComponent("b");
    entities[2].removeComponent("c");

    expect(world.getEntitiesWith("a", "b", "c")).to.have.lengthOf(7);
  });

  describe("update", () => {
    it("rebuilds the coord to entity index", () => {
      let rebuildSpy = spy(world._coordEntityIndex, "rebuild");
      world.update();
      world._coordEntityIndex.rebuild.restore();

      expect(rebuildSpy.calledWith(world.getEntities())).to.be.true;
    });
  });

  it("can be queried for all entities at a given coordinate position", () => {
    world.update(); // Rebuild the index
    let entities00 = world.getEntitiesAt(new Coord(0, 0));
    let entities10 = world.getEntitiesAt(new Coord(1, 0));
    let entities01 = world.getEntitiesAt(new Coord(0, 1));
    let empty = world.getEntitiesAt(new Coord(2, 2));

    expect(entities00).to.have.lengthOf(10);
    expect(entities10).to.have.lengthOf(10);
    expect(entities01).to.have.lengthOf(10);
    expect(empty).to.have.lengthOf(0);
  });
});
