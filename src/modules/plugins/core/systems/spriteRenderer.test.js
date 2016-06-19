import SpriteRenderer from "./SpriteRenderer";
import World from "../../../ecs/World";
import HexGrid from "../../../grid/HexGrid";
import { Point } from "paper";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("SpriteRenderer", () => {
  let sys, world, grid, paper, app;

  beforeEach(() => {
    sys = new SpriteRenderer();
    world = new World();
    grid = new HexGrid(1);
    world.addEntities(grid.buildTiles());

    // Stub out the dependencies
    paper = {
      Point,
      Symbol: stub().returns({
        place: stub().returns({})
      }),
      view: {
        // Pretend the view is 800x600
        center: { x: 400, y: 300 }
      }
    };

    app = {
      world,
      grid,
      paper
    };
  });

  it("should be tagged as 'renderer'", () => {
    expect(sys.tag).to.equal("renderer");
  });

  describe("draw", () => {
    it("should fetch all entities containing Coord and Sprite components", () => {
      const getEntitiesWithSpy = spy(world, "getEntitiesWith");
      sys.draw(app);
      world.getEntitiesWith.restore();

      expect(getEntitiesWithSpy.calledWith("coord", "sprite")).to.be.true;
    });

    it("should position the graphic of every entity's sprite", () => {
      const getItemSpies = [];
      const tiles = world.getEntities();

      tiles.forEach((tile) => {
        let sprite = tile.getComponent("sprite");
        getItemSpies.push(stub(sprite, "getItem").returns({
          position: new Point()
        }));
      });

      sys.draw(app);

      getItemSpies.forEach((getItemSpy) => {
        expect(getItemSpy.calledWith(paper)).to.be.true;
        expect(getItemSpy.returnValues[0].position instanceof Point).to.be.true;
        // Little bit of a "cheap" test, but let's just make sure that they're
        // reasonably close to the center of the screen
        expect(getItemSpy.returnValues[0].position.x).to.be.closeTo(400, 50);
        expect(getItemSpy.returnValues[0].position.y).to.be.closeTo(300, 50);
      });
    });
  });
});
