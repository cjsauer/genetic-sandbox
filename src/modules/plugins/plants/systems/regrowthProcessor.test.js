import RegrowthProcessor from "./RegrowthProcessor";
import World from "../../../ecs/World";
import HexGrid from "../../../grid/HexGrid";
import Coord from "../../core/components/Coord";
import DNA from "../../creatures/components/DNA";
import { buildPlant } from "../../plants/assembly";
import { buildCreature } from "../../creatures/assembly";
import { expect } from "chai";
import { stub } from "sinon";

describe("RegrowthProcessor", () => {
  let app, sys;

  beforeEach(() => {
    const world = new World();
    const grid = new HexGrid(1);
    const random = {
      bool: stub(),
      real: stub().returns(0.5),
      shuffle: (a) => a
    };

    world.addEntities(grid.buildTiles());
    world.addEntity(buildCreature(new DNA(1, 1, random), new Coord(0, 0)));
    world.addEntity(buildPlant(10, new Coord(1, 0)));

    app = { world, grid, random };
    sys = new RegrowthProcessor();
  });

  it("should continuously spread new plants from existing ones", () => {
    let originalPlantCount = app.world.getEntitiesWith("plant").length;

    // Always try and place a plant
    app.random.bool.returns(true);

    // This should sprout one new plant
    app.world.update();
    sys.update(app);
    expect(app.world.getEntitiesWith("plant").length).to.equal(originalPlantCount + 1);

    // This should fill the grid (except for the creature space) with plants
    app.world.update();
    sys.update(app);
    app.world.update();
    sys.update(app);
    app.world.update();
    sys.update(app);
    expect(app.world.getEntitiesWith("plant")).to.have.lengthOf(6);
  });
});
