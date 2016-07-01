import BrainProcessor from "./BrainProcessor";
import Brain from "../components/Brain";
import DNA from "../components/DNA";
import World from "../../../ecs/World";
import Entity from "../../../ecs/Entity";
import Sequencer from "../../../neuroevolution/Sequencer";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("BrainProcessor", () => {
  let app;

  beforeEach(() => {
    const world = new World();

    const random = {
      real: stub().returns(0)
    };

    // Add some brains to the world
    for (let i = 0; i < 3; i++) {
      let entity = new Entity();
      let dna = new DNA(1, 1, random);
      let brain = new Brain(dna, new Sequencer());
      spy(brain, "activate");
      entity.addComponent(brain);
      world.addEntity(entity);
    }

    app = { world };
  });

  it("should be tagged as 'processor'", () => {
    const sys = new BrainProcessor();
    expect(sys.tag).to.equal("processor");
  });

  describe("think", () => {
    it("should activate the brains of all creatures", () => {
      const sys = new BrainProcessor();
      sys.think(app);
      app.world.getEntitiesWith("brain").forEach((entity) => {
        expect(entity.getComponent("brain").activate.calledOnce).to.be.true;
      });
    });
  });
});
