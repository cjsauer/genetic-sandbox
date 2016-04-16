import App from "../../src/modules/App";
import HexGrid from "../../src/modules/grid/HexGrid";
import chai from "chai";
const expect = chai.expect;
import sinon from "sinon";

describe("App", () => {
  let app;

  before(() => {
    app = new App();
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
      app.systems.forEach((system) => {
        sinon.spy(system, "initialize");
      });

      app.initialize();

      app.systems.forEach((system) => {
        expect(system.initialize.calledOnce).to.be.true;
      });
    });
  });

  describe("update", () => {
    it("should call update() on every System in the systems array", () => {
      app.initialize();
      app.systems.forEach((system) => {
        sinon.spy(system, "update");
      });

      app.update();

      app.systems.forEach((system) => {
        expect(system.update.calledOnce).to.be.true;
      });
    });
  });
});
