import App from "./App";
import Plugin from "./plugins/Plugin";
import System from "./ecs/System";
import { expect } from "chai";
import { spy, stub } from "sinon";

describe("App", () => {
  let app, world, grid, plugins, systems, paper;

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
    world = {
      update: spy()
    };
    grid = {};

    systems = [
      new FakeSystem("fake1"),
      new FakeSystem("fake2"),
      new FakeSystem("fake3"),
      new FakeSystem("fake4"),
      new FakeSystem("fake5"),
      new FakeSystem("fake6"),
      new FakeSystem("fake7"),
      new FakeSystem("fake8"),
      new FakeSystem("fake9")
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

    plugins = [
      new Plugin("fake", systems.slice(0, 3), {}),
      new Plugin("faker", systems.slice(3, 6), {}),
      new Plugin("fakest", systems.slice(6, 9), {})
    ];

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

    app = new App(world, grid, paper);
  });

  it("can be instantiated", () => {
    expect(app).to.be.ok;
    expect(app.world).to.be.ok;
    expect(app.grid).to.be.ok;
    expect(app.paper).to.be.ok;
  });

  it("should skip disabled plugins in its processing loop", () => {
    plugins[0].enabled = false;
    app.initialize(plugins);
    const systemSpy = spy();
    app._forEachSystem((system) => systemSpy(system));

    systems.slice(0, 3).forEach((system) => {
      expect(systemSpy.calledWith(system)).to.be.false;
    });
  });

  describe("initialize", () => {
    it("is passed the array of plugins", () => {
      app.initialize(plugins);
      expect(app.plugins).to.be.ok;
      expect(app.plugins.constructor === Array).to.be.true;
    });

    it("can be passed a seed to prepare the random number generator", () => {
      const app1 = new App();
      const app2 = new App();
      app1.initialize([], 1111);
      app2.initialize([], 1111);

      // If the seed is working, both app's random values should produce the same
      // result.
      expect(app1.random.integer(0, 100)).to.equal(app2.random.integer(0, 100));
      expect(app1.random.string(10)).to.equal(app2.random.string(10));
      expect(app1.random.bool()).to.equal(app2.random.bool());
      expect(app1.random.die(20)).to.equal(app2.random.die(20));
      expect(app1.random.real(0, 100)).to.equal(app2.random.real(0, 100));
    });

    it("should call reserve() on every system in every enabled plugin", () => {
      app.initialize(plugins);
      systems.forEach((system) => {
        expect(system.reserve.calledOnce).to.be.true;
      });
    });

    it("should call initialize() on every system in every enabled plugin", () => {
      app.initialize(plugins);
      systems.forEach((system) => {
        expect(system.initialize.calledOnce).to.be.true;
      });
    });
  });

  describe("tick", () => {
    beforeEach(() => {
      app.initialize(plugins);
    });

    it("should udpate the world", () => {
      app.tick();
      expect(world.update.calledOnce).to.be.true;
    });

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
      app.initialize(plugins);
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
