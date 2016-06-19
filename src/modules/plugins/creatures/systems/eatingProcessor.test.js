import EatingProcessor from "./EatingProcessor";
import World from "../../../ecs/World";
import Coord from "../../core/components/Coord";
import { buildDefaultCreature } from "../assembly";
import { buildPlant } from "../../plants/assembly";
import { expect } from "chai";
import { stub } from "sinon";

describe("EatingProcessor", () => {
  let sys, app;

  beforeEach(() => {
    const world = new World();
    const random = {
      real: stub().returns(0)
    };

    // Create a world with one creature and one plant sharing a location,
    // and one plant in a separate location.
    let creature = buildDefaultCreature(new Coord(0, 0), random);
    let plant = buildPlant(10, new Coord(0, 0));
    let otherPlant = buildPlant(10, new Coord(1, 0));
    world.addEntities([ creature, plant, otherPlant ]);

    world.update();
    app = { world };

    sys = new EatingProcessor();
  });

  it("should be tagged as 'processor'", () => {
    expect(sys.tag).to.equal("processor");
  });

  it("should resolve a creature and plant sharing a tile to the creature eating that plant", () => {
    let creature = app.world.getEntitiesWith("creature")[0];
    let energy = creature.getComponent("energy");
    let originalEnergyLevel = energy.level;
    expect(app.world.getEntitiesWith("plant")).to.have.lengthOf(2);

    sys.update(app);

    expect(energy.level).to.equal(originalEnergyLevel + 10);
    expect(app.world.getEntitiesWith("plant")).to.have.lengthOf(1);
  });
});
