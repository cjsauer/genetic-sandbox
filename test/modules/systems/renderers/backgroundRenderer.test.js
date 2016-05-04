import BackgroundRenderer from "../../../../src/modules/systems/renderers/BackgroundRenderer";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("BackgroundRenderer", () => {
  let sys, paper, app;

  beforeEach(() => {
    sys = new BackgroundRenderer();

    // Stub out the dependencies
    paper = {
      Path: {
        Rectangle: stub().returns({})
      },
      Layer: spy(),
      view: {
        // Pretend the view is 800x600
        bounds: { x: 800, y: 600 }
      }
    };

    app = {
      paper
    };
  });

  it("should be tagged as a 'renderer'", () => {
    expect(sys.tag).to.equal("renderer");
  });

  describe("initialize", () => {
    it("should create the background layer", () => {
      sys.initialize(app);
      expect(paper.Layer.calledWithNew()).to.be.true;
    });

    it("should create the rectangular background path", () => {
      sys.initialize(app);
      expect(paper.Path.Rectangle.calledWithNew()).to.be.true;
    });
  });
});
