import AgingProcessor from "./AgingProcessor";
import World from "../../../ecs/World";
import Coord from "../../core/components/Coord";
import { buildDefaultCreature } from "../assembly";
import { expect } from "chai";
import { stub } from "sinon";

describe("AgingProcessor", () => {
  let sys, app, world, random, creature;

  beforeEach(() => {
    random = {
      real: stub().returns(0)
    };

    world = new World();
    creature = buildDefaultCreature(new Coord(0, 0), random);
    world.addEntity(creature);

    app = { world, random };
    sys = new AgingProcessor();
  });

  it("should be tagged as 'processor'", () => {
    expect(sys.tag).to.equal("processor");
  });

  describe("update", () => {
    it("should age creatures by the configured energy amount", () => {
      const energy = creature.getComponent("energy");
      let originalEnergyLevel = energy.level;

      sys.update(app);
      expect(energy.level).to.be.below(originalEnergyLevel);
    });

    it("should destroy dead creatures", () => {
      const energy = creature.getComponent("energy");
      energy._level = 0; // Essentially kill the creature

      sys.update(app);
      expect(world.getEntitiesWith("creature")).to.have.lengthOf(0);
    });
  });
});
