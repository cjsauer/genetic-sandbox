import PlantGenerator from "./PlantGenerator";
import Tile from "../../../grid/Tile";
import Plant from "../components/Plant";
import config from "../../../config";
import { expect } from "chai";
import { stub } from "sinon";

describe("PlantGenerator", () => {
  let sys, app, grid, random;

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
    random = {
      bool: stub()
    };
    app = { grid, random };
    sys = new PlantGenerator(app);
  });

  it("should be tagged as 'generator'", () => {
    expect(sys.tag).to.equal("generator");
  });

  describe("initialize", () => {
    it("should distribute plants to tiles", () => {
      // Stub out the random boolean generation
      random.bool.onCall(0).returns(true);
      random.bool.onCall(1).returns(false);
      random.bool.onCall(2).returns(true);
      random.bool.onCall(3).returns(false);
      random.bool.onCall(4).returns(true);

      sys.initialize(app);

      let tilesWithVegetation = grid.getTiles().filter((tile) => {
        return tile.hasComponent("plant");
      });

      expect(app.random.bool.calledWith(config.plants.vegetationRate)).to.be.true;
      expect(tilesWithVegetation).to.have.length(3);
      tilesWithVegetation.forEach((tile) => {
        expect(tile.get("plant") instanceof Plant).to.be.true;
      });
    });
  });
});
