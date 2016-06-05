import BrainProcessor from "./BrainProcessor";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe.skip("BrainProcessor", () => {
  let app;

  beforeEach(() => {
    const grid = {
      getTilesByComponent: stub().returns([
        { get: stub().returns({
          brain: { activate: spy() }
        })},
        { get: stub().returns({
          brain: { activate: spy() }
        })}
      ])
    };

    app = { grid };
  });

  it("should be tagged as 'processor'", () => {
    const sys = new BrainProcessor();
    expect(sys.tag).to.equal("processor");
  });

  describe("think", () => {
    it("should activate the brains of all creatures", () => {
      const sys = new BrainProcessor();
      sys.think(app);
      app.grid.getTilesByComponent().forEach((tile) => {
        expect(tile.get().brain.activate.calledOnce).to.be.true;
      });
    });
  });
});
