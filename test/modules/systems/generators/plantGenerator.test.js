import PlantGenerator from "../../../../src/modules/systems/generators/PlantGenerator";
import Tile from "../../../../src/modules/grid/Tile";
import Plant from "../../../../src/modules/components/Plant";
import { expect } from "chai";
import { stub } from "sinon";

describe("PlantGenerator", () => {
  let sys, app, grid;

  beforeEach(() => {
    // Stub out the dependencies required by PlantGenerator
    grid = {
      getTiles: stub().returns([
        new Tile(),
        new Tile(),
        new Tile(),
        new Tile(),
        new Tile()
      ])
    };
    app = { grid };
    sys = new PlantGenerator(app);
  });

  it("should be tagged as 'generator'", () => {
    expect(sys.tag).to.equal("generator");
  });

  describe("initialize", () => {
    it("should distribute plants to tiles", () => {
      // Stub out random number generation
      stub(Math, "random");
      Math.random.onCall(0).returns(0); // hit
      Math.random.onCall(1).returns(1); // miss
      Math.random.onCall(2).returns(PlantGenerator.VEGETATION_RATE); // miss
      Math.random.onCall(3).returns(PlantGenerator.VEGETATION_RATE - 0.01); // hit
      Math.random.onCall(4).returns(PlantGenerator.VEGETATION_RATE + 0.01); // miss

      sys.initialize(app);

      Math.random.restore();

      let tilesWithVegetation = grid.getTiles().filter((tile) => {
        return tile.hasComponent("plant");
      });

      expect(tilesWithVegetation).to.have.length(2);
      tilesWithVegetation.forEach((tile) => {
        expect(tile.get("plant") instanceof Plant).to.be.true;
      });
    });
  });
});