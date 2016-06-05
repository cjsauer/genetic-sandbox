import EatingProcessor from "./EatingProcessor";
import HexGrid from "../../../grid/HexGrid";
import Coord from "../../core/components/Coord";
import Plant from "../../plants/components/Plant";
import { expect } from "chai";
import { spy } from "sinon";

describe.skip("EatingProcessor", () => {
  let sys, app, creature, plant;

  beforeEach(() => {
    const grid = new HexGrid(1);

    // Creature at (0, 0)
    creature = { eat: spy() };
    grid.getTile(new Coord(0, 0)).set("creature", creature);
    // Plant at (0, 0)
    plant = new Plant(5);
    grid.getTile(new Coord(0, 0)).set("plant", plant);
    // Plant at (1, 0)
    plant = new Plant(5);
    grid.getTile(new Coord(1, 0)).set("plant", plant);

    app = { grid };

    sys = new EatingProcessor();
  });

  it("should be tagged as 'processor'", () => {
    expect(sys.tag).to.equal("processor");
  });

  it("should resolve a creature and plant sharing a tile to the creature eating that plant", () => {
    const tile = app.grid.getTile(new Coord(0, 0));
    expect(tile.hasComponent("plant")).to.be.true;
    expect(tile.hasComponent("creature")).to.be.true;

    sys.update(app);

    expect(tile.hasComponent("plant")).to.be.false;
    expect(tile.hasComponent("creature")).to.be.true;
    expect(creature.eat.calledWith(plant)).to.be.true;
  });

  it("should not affect tiles that do not contain both a plant and a creature", () => {
    const tile = app.grid.getTile(new Coord(1, 0));
    expect(tile.hasComponent("plant")).to.be.true;

    sys.update(app);

    expect(tile.hasComponent("plant")).to.be.true;
  });
});
