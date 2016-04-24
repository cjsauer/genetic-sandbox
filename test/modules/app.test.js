import App from "../../src/modules/App";
import HexGrid from "../../src/modules/grid/HexGrid";
import ISystem from "../../src/modules/systems/ISystem";
import chai from "chai";
const expect = chai.expect;
import { spy, stub } from "sinon";

describe("App", () => {
  let app, systems, paper;

  class FakeSystem extends ISystem {
    initialize() {}
    update() {}
  }

  beforeEach(() => {
    systems = [
      new FakeSystem(),
      new FakeSystem(),
      new FakeSystem()
    ];
    systems.forEach((system) => {
      spy(system, "initialize");
      spy(system, "update");
    });

    paper = {
      project: {
        clear: stub()
      },
      view: {
        draw: stub()
      }
    };

    app = new App(systems, paper);
  });

  it("can be instantiated", () => {
    expect(app).to.be.ok;
  });

  it("should instantiate a HexGrid", () => {
    expect(app.grid).to.be.ok;
    expect(app.grid instanceof HexGrid).to.be.true;
  });

  it("should contain an array of Systems", () => {
    expect(app.systems).to.be.ok;
    expect(app.systems.constructor === Array).to.be.true;
  });

  describe("initialize", () => {
    it("should call initialize() on every System in the systems array", () => {
      app.initialize();
      app.systems.forEach((system) => {
        expect(system.initialize.calledOnce).to.be.true;
      });
    });
  });

  describe("update", () => {
    beforeEach(() => {
      app.initialize();
    });

    it("should call update() on every System in the systems array", () => {
      app.update();
      app.systems.forEach((system) => {
        expect(system.update.calledOnce).to.be.true;
      });
    });
  });

  describe("run and stop", () => {
    let stubSet, stubClear;

    beforeEach(() => {
      stubSet = stub(global, "setInterval").returns({});
      stubClear = stub(global, "clearInterval");
    });

    afterEach(() => {
      stubSet.restore();
      stubClear.restore();
    });

    it("should start an interval timer to tick the simulation", () => {
      app.run();
      expect(app._timer).to.be.ok;
      expect(stubSet.calledOnce).to.be.true;
    });

    it("should clear the previously set interval", () => {
      app.run();
      app.stop();
      expect(stubClear.calledWith(app._timer)).to.be.true;
    });
  });

  describe("_tick", () => {
    it("should clear the scene", () => {
      app._tick();
      expect(app.paper.project.clear.calledOnce).to.be.true;
    });

    it("should call update", () => {
      let spy = spy(app, "update");
      app._tick();
      expect(app.update.calledOnce).to.be.true;
      spy.restore();
    });

    it("should draw the view", () => {
      app._tick();
      expect(app.paper.view.draw.calledOnce).to.be.true;
    });
  });
});
