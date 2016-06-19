import CoordEntityIndex from "./CoordEntityIndex";
import Coord from "../plugins/core/components/Coord";
import Entity from "../ecs/Entity";
import { expect } from "chai";
import { spy } from "sinon";

describe("CoordEntityIndex", () => {
  let entities;

  beforeEach(() => {
    entities = [
      new Entity(),
      new Entity(),
      new Entity(),
      new Entity(),
      new Entity(),
      new Entity() // This entity will have no Coord component attached
    ];

    entities[0].addComponent(new Coord(-1, -1));
    entities[1].addComponent(new Coord(-1, -1));
    entities[2].addComponent(new Coord(0, 0));
    entities[3].addComponent(new Coord(0, 0));
    entities[4].addComponent(new Coord(1, 1));
  });

  it("can (re)build an index mapping coordinates to entities given an array of entities", () => {
    const coordEntityIndex = new CoordEntityIndex();
    spy(coordEntityIndex, "_clear");
    coordEntityIndex.rebuild(entities);

    expect(coordEntityIndex._clear.calledOnce).to.be.true;
    expect(coordEntityIndex.length).to.equal(5);
    expect(coordEntityIndex.findEntitiesAt(new Coord(-1, -1))).to.deep.include.members([
      entities[0],
      entities[1]
    ]);
    expect(coordEntityIndex.findEntitiesAt(new Coord(0, 0))).to.deep.include.members([
      entities[2],
      entities[3]
    ]);
    expect(coordEntityIndex.findEntitiesAt(new Coord(1, 1))).to.deep.include.members([ entities[4] ]);
    expect(coordEntityIndex.findEntitiesAt(new Coord(-1, 1))).to.have.length(0);
  });

  it("skips entities that do not have a Coord component", () => {
    const coordEntityIndex = new CoordEntityIndex();
    coordEntityIndex.rebuild(entities);

    Object.keys(coordEntityIndex._map).forEach((key) => {
      expect(coordEntityIndex._map[key]).to.not.eql(entities[5]);
    });
  });

  it("can completely clear the index", () => {
    const coordEntityIndex = new CoordEntityIndex();
    coordEntityIndex.rebuild(entities);
    expect(coordEntityIndex.length).to.be.above(0);

    coordEntityIndex._clear();

    expect(coordEntityIndex.length).to.equal(0);
  });

  it("can hash a Coord instance", () => {
    const coordEntityIndex = new CoordEntityIndex();
    const coord1 = new Coord(0, 0);
    const coord2 = new Coord(-1, 1);
    const coord3 = new Coord(0, 1);

    expect(coordEntityIndex._hashCoord(coord1)).to.equal("0,0");
    expect(coordEntityIndex._hashCoord(coord2)).to.equal("-1,1");
    expect(coordEntityIndex._hashCoord(coord3)).to.equal("0,1");
  });
});
