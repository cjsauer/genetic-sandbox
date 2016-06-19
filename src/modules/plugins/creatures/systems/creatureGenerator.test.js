import CreatureGenerator from "./CreatureGenerator";
import World from "../../../ecs/World";
import HexGrid from "../../../grid/HexGrid";
import { expect } from "chai";
import { stub } from "sinon";

describe("CreatureGenerator", () => {
  let sys, app, world, random;

  beforeEach(() => {
    world = new World();
    const grid = new HexGrid(1);
    world.addEntities(grid.buildTiles());

    random = {
      bool: stub(),
      real: stub().returns(0)
    };
    app = { world, random };
    sys = new CreatureGenerator();
  });

  it("should be tagged as 'generator'", () => {
    expect(sys.tag).to.equal("generator");
  });

  describe("initialize", () => {
    it("should randomly distribute creatures to tiles", () => {
      // Stub out the random boolean generation
      random.bool.onCall(0).returns(true);
      random.bool.onCall(1).returns(false);
      random.bool.onCall(2).returns(true);
      random.bool.onCall(3).returns(false);
      random.bool.onCall(4).returns(true);

      sys.initialize(app);

      let tilesWithVegetation = world.getEntitiesWith("creature");
      expect(tilesWithVegetation).to.have.lengthOf(3);
    });
  });
});
