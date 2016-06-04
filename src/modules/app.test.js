import App from "./App";
import Plugin from "./plugins/Plugin";
import System from "./ecs/System";
import { expect } from "chai";
import { spy, stub } from "sinon";

describe("App", () => {
  let app, grid, plugins, systems, paper;

  class FakeSystem extends System {
    reserve() {}
    initialize() {}
    update() {}
    draw() {}
    sense() {}
    think() {}
    attempt() {}
  }

  beforeEach(() => {
    grid = {};

    systems = [
      new FakeSystem(),
      new FakeSystem(),
      new FakeSystem()
    ];

    systems.forEach((system) => {
      spy(system, "reserve");
      spy(system, "initialize");
      spy(system, "update");
      spy(system, "draw");
      spy(system, "sense");
      spy(system, "think");
      spy(system, "attempt");
    });

    plugins = [ new Plugin("fake", systems, {}) ];

    paper = {
      Path: {
        Rectangle: stub()
      },
      project: {
        clear: stub()
      },
      view: {
        draw: stub(),
        size: {
          width: 800,
          height: 600
        }
      }
    };

    app = new App(grid, plugins, paper);
  });

  it("can be instantiated", () => {
    expect(app).to.be.ok;
  });

  it("can be instantiated with a seed for the random number generator", () => {
    const app1 = new App({}, [], {}, 1111);
    const app2 = new App({}, [], {}, 1111);
    // If the seed is working, both app's random values should produce the same
    // result.
    expect(app1.random.integer(0, 100)).to.equal(app2.random.integer(0, 100));
    expect(app1.random.string(10)).to.equal(app2.random.string(10));
    expect(app1.random.bool()).to.equal(app2.random.bool());
    expect(app1.random.die(20)).to.equal(app2.random.die(20));
    expect(app1.random.real(0, 100)).to.equal(app2.random.real(0, 100));
  });

  it("should contain an array of Plugins", () => {
    expect(app.plugins).to.be.ok;
    expect(app.plugins.constructor === Array).to.be.true;
  });

  it("should skip disabled plugins in its processing loop", () => {
    plugins[0].enabled = false;
    const systemSpy = spy();
    app._forEachSystem((system) => systemSpy(system));
    systems.forEach((system) => {
      expect(systemSpy.calledWith(system)).to.be.false;
    });
  });

  describe("initialize", () => {
    it("should call reserve() on every system in every enabled plugin", () => {
      app.initialize();
      systems.forEach((system) => {
        expect(system.reserve.calledOnce).to.be.true;
      });
    });

    it("should call initialize() on every system in every enabled plugin", () => {
      app.initialize();
      systems.forEach((system) => {
        expect(system.initialize.calledOnce).to.be.true;
      });
    });
  });

  describe("tick", () => {
    it("should call update() on every system in every enabld plugin", () => {
      app.tick();
      systems.forEach((system) => {
        expect(system.update.calledOnce).to.be.true;
      });
    });

    it("should call draw() on every system in every enabld plugin", () => {
      app.tick();
      systems.forEach((system) => {
        expect(system.draw.calledOnce).to.be.true;
      });
    });

    it("should call sense() on every system in every enabld plugin", () => {
      app.tick();
      systems.forEach((system) => {
        expect(system.sense.calledOnce).to.be.true;
      });
    });

    it("should call think() on every system in every enabld plugin", () => {
      app.tick();
      systems.forEach((system) => {
        expect(system.think.calledOnce).to.be.true;
      });
    });

    it("should call attempt() on every system in every enabld plugin", () => {
      app.tick();
      systems.forEach((system) => {
        expect(system.attempt.calledOnce).to.be.true;
      });
    });
  });

  describe("run and stop", () => {
    let stubSetInterval, stubClearInterval;

    beforeEach(() => {
      stubSetInterval = stub(global, "setInterval").returns({});
      stubClearInterval = stub(global, "clearInterval");
    });

    afterEach(() => {
      stubSetInterval.restore();
      stubClearInterval.restore();
    });

    it("should start an interval timer to tick the simulation", () => {
      app.run();
      expect(app._timer).to.be.ok;
      expect(stubSetInterval.calledOnce).to.be.true;
    });

    it("should clear the previously set interval", () => {
      app.run();
      app.stop();
      expect(stubClearInterval.calledWith(app._timer)).to.be.true;
    });

    it("should do nothing if no timer is set", () => {
      app.stop();
      expect(stubClearInterval.called).to.be.false;
    });
  });
});
